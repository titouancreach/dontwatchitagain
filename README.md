# Don't watch it again

DWIA is a chrome extension for people who watch their series in streaming.
It detects the episode you have ever seen and prevents you to watch it again.

# How it's work ?
The chrome extension scans the url you visite and watch for match between the URL and a pattern, if yes, it saves the episode, the season and the name.
If you have ever visited this url, a notification shows up.

# Patterns
The url matches with a pattern. A pattern is like a very very simplified regex. The special tokens are :
  - ${NAME} for the name of the series.
  - ${EPISODE} for the episode.
  - ${SEASON} for the season.
  - ${IGNORE} for the token you want to ignore.

#Example

If you watch a series named FOOBAR in a website named : www.series/, the url would probably be something like :
    `www.series/545de-episode-5-season-8-FOOBAR`
for this case you would make a pattern like :
   `www.series/${IGNORE}-episode-{EPISODE}-season-{SEASON}-{NAME}`

Remember to ignore the part of the url which have no sense for you with the ${IGNORE} token.
