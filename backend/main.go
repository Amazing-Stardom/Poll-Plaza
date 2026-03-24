package main

import (
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Enable CORS for frontend requests
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Initialize the database connection
	InitDB()

	polls := r.Group("/polls")
	{
		polls.POST("/create_poll", CreatePoll)
		polls.GET("/fetch_polls", FetchPolls)
		polls.GET("/filter_tag", FilterTag)
		polls.PUT("/update_choice/:pk", UpdateChoice)
		polls.GET("/fetch_polls/id=:pk", FetchPoll) // to match django route fetch_polls/id=<int:pk>
		polls.GET("/Vote/id=:pk", FetchPoll)        // to match django route Vote/id=<int:pk>
		polls.GET("/fetch_tags/", FetchTags)
	}

	log.Println("Starting Go backend server on port 8000...")
	if err := r.Run(":8000"); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}
