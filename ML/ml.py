import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
# %matplotlib inline

df = pd.read_csv("../input/Ecommerce Customers")
df.head()

df.info()

df.describe()

sns.set_palette("GnBu_d")
sns.set_style('whitegrid')
sns.jointplot(y='Yearly Amount Spent',x='Time on Website',data=df)

sns.jointplot(y='Yearly Amount Spent',x='Time on App',data=df)

sns.jointplot(x="Time on App", y="Length of Membership", data=df, kind='hex')

sns.pairplot(data=df)

sns.lmplot(x='Yearly Amount Spent',y='Length of Membership', data=df)


sns.jointplot(x='Yearly Amount Spent',y='Length of Membership', data=df, kind='reg')

from sklearn.model_selection import train_test_split

df.columns

X = df[['Avg. Session Length', 'Time on App', 'Time on Website', 'Length of Membership']]
y = df['Yearly Amount Spent']

X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.3, random_state=101)



from sklearn.linear_model import LinearRegression
lm = LinearRegression()

lm.fit(X_train, y_train)

lm.coef_
#This shows for one unit increase in this yearly_amount_spent increases by following

y_predicted = lm.predict(X_test)
sns.scatterplot(y_test, y_predicted)


from sklearn import metrics
print('MAE: ',metrics.mean_absolute_error(y_test,y_predicted))
print('MSE: ',metrics.mean_squared_error(y_test,y_predicted))
print('RMSE:',np.sqrt(metrics.mean_squared_error(y_test,y_predicted)))


sns.distplot(y_test-y_predicted, bins=50)

coeffecients = pd.DataFrame(lm.coef_,X.columns)
coeffecients.columns = ['Coeffecient']
coeffecients