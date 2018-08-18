package main

type Drink struct {
	ID       int     `json:"id"`
	Percent  float64 `json:"percent,string"`
	Oz       float64 `json:"oz,string"`
	Stddrink float64 `json:"stddrink"`
}