package main

type Drink struct {
	ID       int     `json:"id"`
	Percent  float64 `json:"percent"`
	Oz       float64 `json:"oz"`
	Stddrink float64 `json:"stddrink"`
}
