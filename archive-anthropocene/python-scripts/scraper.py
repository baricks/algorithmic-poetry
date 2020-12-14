## A collection of scripts that scrape Twitter by search term and then save into a CSV + JSON + txt file.

import snscrape.modules.twitter as sntwitter
import pandas as pd
import numpy as np

# Query by text search
# Setting variables to be used below
maxTweets = 1000000

# Creating list to append tweet data to
tweets_list2 = []

# Using TwitterSearchScraper to scrape data and append tweets to list
for i,tweet in enumerate(sntwitter.TwitterSearchScraper('smooth handfish since:2008-01-01 until:2020-12-05').get_items()):
    if i>maxTweets:
        break
    tweets_list2.append([tweet.date, tweet.id, tweet.content, tweet.user.username])

# Creating a dataframe from the tweets list above
tweets_df2 = pd.DataFrame(tweets_list2, columns=['Datetime', 'Tweet Id', 'Text', 'Username'])

# Display first 5 entries from dataframe
tweets_df2.head()

# Export dataframe into a CSV
tweets_df2.to_csv('data/smooth-handfish.csv', sep=',', index=False)

# Export dataframe to json
tweets_df2.to_json("data/smooth-handfish.json", orient = "records", date_format = "epoch", double_precision = 10, force_ascii = True, date_unit = "ms", default_handler = None)

# Export tweets from CSV to text file
col_list = ['Datetime', 'Tweet Id', 'Text', 'Username']
df = pd.read_csv("data/climate-tweets.csv", usecols=col_list)
tweets = (df["Text"])
np.savetxt(r'tweets.txt', tweets, fmt='%s')
