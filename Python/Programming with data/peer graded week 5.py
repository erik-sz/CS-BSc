from collections import Counter 

f = open("Python/Programming with data/sample.txt", "r")
data = f.read()
f.close()
words = data.split(" ")

numberOfOccurencies = 0

for i in range(len(words)):
    if words[i].find("of") != -1:        
        numberOfOccurencies += 1

cntr = Counter(words) 
most_occur = cntr.most_common(5)
    
print("The number of words in the text: " + str(len(words)))
print("The number of 'of' in the text: " + str(numberOfOccurencies))
print("The ive most popular words: " + str(most_occur))





