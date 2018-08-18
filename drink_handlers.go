package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"net/http"
	"strconv"
)

func getRootHandler(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("assets/index.html")
	t.Execute(w, nil)
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func createDrinkHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	drink := Drink{}
	err := r.ParseForm()
	if err != nil {
		fmt.Fprintf(w, err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	percent, err := strconv.ParseFloat(r.Form.Get("percent"), 64)
	if err != nil {
		fmt.Fprintf(w, err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	drink.Percent = percent

	oz, err := strconv.ParseFloat(r.Form.Get("oz"), 64)
	if err != nil {
		fmt.Fprintf(w, err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	drink.Oz = oz

	err = store.CreateDrink(&drink)
	if err != nil {
		fmt.Fprintf(w, err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	/// this is not redirecting as it should
	http.Redirect(w, r, "/", http.StatusCreated)
}

func getDrinksHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	drinks, err := store.GetDrinks()
	if err != nil {
		fmt.Fprintf(w, err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	drinkListBytes, err := json.Marshal(drinks)
	if err != nil {
		fmt.Fprintf(w, err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(drinkListBytes)
}
