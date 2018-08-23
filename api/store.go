package main

import (
	"database/sql"
	"github.com/jonathanwthom/my-tab/stddrink"
)

type Store interface {
	CreateDrink(drink *Drink) (*Drink, error)
	GetDrinks() ([]*Drink, error)
}

type dbStore struct {
	db *sql.DB
}

func (store *dbStore) CreateDrink(drink *Drink) (*Drink, error) {
	drink.Stddrink = stddrink.Calculate(drink.Percent, drink.Oz)
	var id int
	var percent, oz, stddrink float64

	sqlStatement := `
		INSERT INTO drinks(percent, oz, stddrink)
		VALUES ($1, $2, $3)
		RETURNING id, percent, oz, stddrink`

	err := store.db.QueryRow(sqlStatement,
		drink.Percent,
		drink.Oz,
		drink.Stddrink).Scan(&id, &percent, &oz, &stddrink)
	if err != nil {
		return nil, err
	}

	drink.ID = id
	drink.Percent = percent
	drink.Oz = oz
	drink.Stddrink = stddrink
	return drink, err
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
