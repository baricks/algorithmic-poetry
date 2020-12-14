## A collection of random scripts to manipulate the text

import csv
import json
import pandas as pd
import random
import markovify

col_list = ['Datetime', 'Tweet Id', 'Text', 'Username']
df = pd.read_csv("data/climate-tweets.csv", usecols=col_list)
tweets = (df["Text"])

# Print a random tweet
print(random.choice(tweets))

# Use a Markov chain to generate new tweets
with open("./data/climate-tweets.txt") as f:
	climateTweets = f.read()
model = markovify.Text(climateTweets)
# Create random tweet
for i in range(0, 3):
    sentence = model.make_sentence()
    # Print tweet
    print ("\n" + sentence + "\n")
