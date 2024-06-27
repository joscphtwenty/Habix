import pymongo
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer


sid = SentimentIntensityAnalyzer()

def analyze_emotion(text):
    
    sentiment_scores = sid.polarity_scores(text)

    
    if sentiment_scores['compound'] >= 0.05:
        emotion = 'positive'
    elif sentiment_scores['compound'] <= -0.05:
        emotion = 'negative'
    else:
        emotion = 'neutral'

    return sentiment_scores, emotion


client = pymongo.MongoClient("mongodb+srv://joseph:josephjohn@cluster0.uihl10f.mongodb.net/")
db = client["test"]
collection = db["journalentries"]


texts_from_db = collection.find()


for document in texts_from_db:
    text = document.get("entry", "")  
    
    
    sentiment_scores, emotion = analyze_emotion(text)
    
    collection.update_one(
        {"_id": document["_id"]}, 
        {"$set": {
            "sentiment_scores": sentiment_scores,
            "emotion": emotion,
            "positive": sentiment_scores["pos"],
            "negative": sentiment_scores["neg"],
            "neutral": sentiment_scores["neu"],
            "compound": sentiment_scores["compound"]
        }}
    )
    print("Text:", text)
    print("Sentiment scores:", sentiment_scores)
    print("Emotion:", emotion)
    print()
