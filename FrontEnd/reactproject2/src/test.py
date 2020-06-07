import sys; 
import pandas as pd
df = pd.read_csv("googleplaystore_user_reviews.csv")
df = df.dropna()
df = df.reset_index(drop=True)
df.head()
X = df[['Translated_Review']]
Y=df[['Sentiment']]
from sklearn.model_selection import train_test_split
X_train, X_test, Y_train, Y_test = train_test_split(X,Y,test_size=0.2,random_state=0)
from sklearn.feature_extraction.text import TfidfVectorizer
# Create feature vectors
vectorizer = TfidfVectorizer(min_df = 5,
                             max_df = 0.8,
                             sublinear_tf = True,
                             use_idf = True)
train_vectors = vectorizer.fit_transform(X_train['Translated_Review'])
test_vectors = vectorizer.transform(X_test['Translated_Review'])
import time
from sklearn import svm
from sklearn.metrics import classification_report
# Perform classification with SVM, kernel=linear
classifier_linear = svm.SVC(kernel='linear')
t0 = time.time()
classifier_linear.fit(train_vectors, Y_train['Sentiment'])
t1 = time.time()
prediction_linear = classifier_linear.predict(test_vectors)
t2 = time.time()
time_linear_train = t1-t0
time_linear_predict = t2-t1
# results
print("Training time: %fs; Prediction time: %fs" % (time_linear_train, time_linear_predict))
report = classification_report(Y_test['Sentiment'], prediction_linear, output_dict=True)
#print('positive: ', report['Positive'])
#print('negative: ', report['Negative'])
#print('neutral: ', report['Neutral'])
review = """Hate"""
review_vector = vectorizer.transform([review]) # vectorizing
print(classifier_linear.predict(review_vector))