package main

import (
	"time"
)

// Question model matching `polls_question` table
type Question struct {
	ID           int       `gorm:"column:id;primaryKey;autoIncrement"`
	QuestionText string    `gorm:"column:question_text"`
	PubDate      time.Time `gorm:"column:pub_date"`
	Choices      []Choice  `gorm:"foreignKey:QuestionID"`
	Tags         []Tag     `gorm:"foreignKey:QuestionID"`
}

func (Question) TableName() string {
	return "polls_question"
}

// Choice model matching `polls_choice` table
type Choice struct {
	ID         int    `gorm:"column:id;primaryKey;autoIncrement"`
	ChoiceText string `gorm:"column:choice_text"`
	Votes      int    `gorm:"column:votes"`
	QuestionID int    `gorm:"column:question_id"`
}

func (Choice) TableName() string {
	return "polls_choice"
}

// Tag model matching `polls_tag` table
type Tag struct {
	ID         int    `gorm:"column:id;primaryKey;autoIncrement"`
	Tag        string `gorm:"column:tag"`
	QuestionID int    `gorm:"column:question_id"`
}

func (Tag) TableName() string {
	return "polls_tag"
}
