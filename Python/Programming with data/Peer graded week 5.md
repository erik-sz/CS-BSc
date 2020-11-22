# Peer graded assignment week 5

* The data comes from a txt file which include about 1000 words from an articel. The program opens the file, saves the data to a variable, and then splits it up to different objects collected in a list.
* Technics that I used to count the words:
I simply applied the len function on the list of the the words and printed it.
* Technics that I used to find the occurece of a specific word:
I used a for loop to loop over the list of the words and added plus one at each loop where the find function returned a number which is not equal to -1, in other words, where it has found the searched word and then added plus one to the counter.
* Technics that I used to find the five most popular words:
I imported the Counter subclass from the collections. Counter is a container that holds the count of each of the elements in key-value pair. It has a built in function called most_common(k), that that returns the k most common elements from the list.