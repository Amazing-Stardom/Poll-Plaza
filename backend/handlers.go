package main

import (
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

func CreatePoll(c *gin.Context) {
	var payload struct {
		Question   string         `json:"Question"`
		OptionVote map[string]int `json:"OptionVote"`
		Tags       []string       `json:"Tags"`
	}

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON data"})
		return
	}

	question := Question{
		QuestionText: payload.Question,
		PubDate:      time.Now(),
	}

	if err := DB.Create(&question).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create question"})
		return
	}

	for option, votes := range payload.OptionVote {
		choice := Choice{
			ChoiceText: option,
			Votes:      votes,
			QuestionID: question.ID,
		}
		DB.Create(&choice)
	}

	for _, tagName := range payload.Tags {
		tag := Tag{
			Tag:        tagName,
			QuestionID: question.ID,
		}
		DB.Create(&tag)
	}

	c.JSON(http.StatusOK, gin.H{"Data": "Loaded"})
}

func FetchPolls(c *gin.Context) {
	var questions []Question
	if err := DB.Preload("Choices").Preload("Tags").Find(&questions).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Questions not found"})
		return
	}

	var formattedData []map[string]interface{}
	for _, q := range questions {
		optionVote := make(map[string]int)
		for _, choice := range q.Choices {
			optionVote[choice.ChoiceText] = choice.Votes
		}

		tags := make([]string, 0)
		for _, tag := range q.Tags {
			tags = append(tags, tag.Tag)
		}

		questionDict := map[string]interface{}{
			"Question":   q.QuestionText,
			"OptionVote": optionVote,
			"Tags":       tags,
			"id":         q.ID,
		}
		formattedData = append(formattedData, questionDict)
	}

	// Make sure we return an empty array if empty, like JSON response
	if formattedData == nil {
		formattedData = []map[string]interface{}{}
	}

	c.JSON(http.StatusOK, formattedData)
}

func FilterTag(c *gin.Context) {
	tagsParam := c.Query("tags")
	var questions []Question
	var formattedData []map[string]interface{}

	if tagsParam == "" {
		if err := DB.Preload("Choices").Preload("Tags").Find(&questions).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch polls"})
			return
		}
	} else {
		tagList := strings.Split(tagsParam, ",")

		// Find distinct question IDs matching the tags
		var tagModels []Tag
		DB.Where("tag IN ?", tagList).Find(&tagModels)

		var questionIDs []int
		seen := make(map[int]bool)
		for _, t := range tagModels {
			if !seen[t.QuestionID] {
				seen[t.QuestionID] = true
				questionIDs = append(questionIDs, t.QuestionID)
			}
		}

		if len(questionIDs) > 0 {
			if err := DB.Preload("Choices").Preload("Tags").Where("id IN ?", questionIDs).Find(&questions).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch filtered polls"})
				return
			}
		} else {
			// No questions match the tags
			c.JSON(http.StatusOK, []map[string]interface{}{})
			return
		}
	}

	for _, q := range questions {
		optionVote := make(map[string]int)
		for _, choice := range q.Choices {
			optionVote[choice.ChoiceText] = choice.Votes
		}

		tags := make([]string, 0)
		for _, tag := range q.Tags {
			tags = append(tags, tag.Tag)
		}

		questionDict := map[string]interface{}{
			"Question":   q.QuestionText,
			"OptionVote": optionVote,
			"Tags":       tags,
			"id":         q.ID,
		}
		formattedData = append(formattedData, questionDict)
	}

	if formattedData == nil {
		formattedData = []map[string]interface{}{}
	}

	c.JSON(http.StatusOK, formattedData)
}

func UpdateChoice(c *gin.Context) {
	pk := c.Param("pk")

	var payload struct {
		IncrementOption string `json:"incrementOption"`
	}

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid payload"})
		return
	}

	var choice Choice
	if err := DB.Where("question_id = ? AND choice_text = ?", pk, payload.IncrementOption).First(&choice).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Question or choice does not exist"})
		return
	}

	choice.Votes += 1
	DB.Save(&choice)

	c.JSON(http.StatusOK, gin.H{"message": "Option incremented successfully"})
}

func FetchPoll(c *gin.Context) {
	pk := c.Param("pk")

	var question Question
	if err := DB.Preload("Choices").Preload("Tags").First(&question, pk).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Question not found"})
		return
	}

	optionVote := make(map[string]int)
	for _, choice := range question.Choices {
		optionVote[choice.ChoiceText] = choice.Votes
	}

	tags := make([]string, 0)
	for _, tag := range question.Tags {
		tags = append(tags, tag.Tag)
	}

	formattedData := map[string]interface{}{
		"Question":   question.QuestionText,
		"OptionVote": optionVote,
		"Tags":       tags,
		"id":         question.ID,
	}

	// Front-end expects an array for fetch_poll based on Django code
	c.JSON(http.StatusOK, []map[string]interface{}{formattedData})
}

func FetchTags(c *gin.Context) {
	var distinctTags []string
	if err := DB.Model(&Tag{}).Distinct().Pluck("tag", &distinctTags).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Tags not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"Tags": distinctTags})
}
