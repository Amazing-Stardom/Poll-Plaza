package main

import (
	"log"
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

var DB *gorm.DB

func InitDB() {
	var err error

	// We use the existing mydatabase file to retain existing data.
	DB, err = gorm.Open(sqlite.Open("mydatabase"), &gorm.Config{
		NamingStrategy: schema.NamingStrategy{
			SingularTable: true, // we might need this since Django often uses singular or custom names, wait let's use custom table names
		},
	})

	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	log.Println("Database connection established")

	// Set up database connection pool
	sqlDB, err := DB.DB()
	if err != nil {
		log.Fatal("Failed to get sql.DB:", err)
	}

	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)
}
