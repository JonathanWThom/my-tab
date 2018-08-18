package main

import (
	"database/sql"
	"github.com/jonathanwthom/my-tab/stddrink"
)

type Store interface {
	CreateDrink(drink *Drink) error
	GetDrinks() ([]*Drink, error)
}

type dbStore struct {
	db *sql.DB
}

func (store *dbStore) CreateDrink(drink *Drink) error {
	drink.Stddrink = stddrink.Calculate(drink.Percent, drink.Oz)
	_, err := store.db.Exec("INSERT INTO drinks(percent, oz, stddrink) VALUES($1, $2, $3)",
		drink.Percent, drink.Oz, drink.Stddrink)
	return err
}

func (store *dbStore) GetDrinks() ([]*Drink, error) {
	rows, err := store.db.Query("SELECT id, percent, oz, stddrink FROM drinks")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	drinks := []*Drink{}
	for rows.Next() {
		drink := &Drink{}
		if err := rows.Scan(&drink.ID, &drink.Percent, &drink.Oz, &drink.Stddrink); err != nil {
			return nil, err
		}

		drinks = append(drinks, drink)
	}

	return drinks, nil
}

var store Store

func InitStore(s Store) {
	store = s
}
