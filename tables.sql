CREATE TABLE drinks (
  id serial PRIMARY KEY,
  oz NUMERIC NOT NULL,
  percent NUMERIC NOT NULL,
  stddrink NUMERIC NOT NULL,
  imbibed_on TIMESTAMPTZ NOT NULL
);
