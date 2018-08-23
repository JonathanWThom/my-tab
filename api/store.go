package main

import (
	"database/sql"
	"github.com/jonathanwthom/my-tab/stddrink"
	"time"
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
	var imbibedOn time.Time

	sqlStatement := `
		INSERT INTO drinks(percent, oz, stddrink, imbibed_on)
		VALUES ($1, $2, $3, $4)
		RETURNING id, percent, oz, stddrink, imbibed_on`

	err := store.db.QueryRow(sqlStatement,
		drink.Percent,
		drink.Oz,
		drink.Stddrink,
		drink.ImbibedOn).Scan(&id, &percent, &oz, &stddrink, &imbibedOn)
	if err != nil {
		return nil, err
	}

	drink.ID = id
	drink.Percent = percent
	drink.Oz = oz
	drink.Stddrink = stddrink
	drink.ImbibedOn = imbibedOn
	return drink, err
}

func (store *dbStore) GetDrinks() ([]*Drink, error) {
	rows, err := store.db.Query("SELECT id, percent, oz, stddrink, imbibed_on FROM drinks")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	drinks := []*Drink{}
	for rows.Next() {
		drink := &Drink{}
		if err := rows.Scan(&drink.ID, &drink.Percent, &drink.Oz, &drink.Stddrink, &drink.ImbibedOn); err != nil {
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
