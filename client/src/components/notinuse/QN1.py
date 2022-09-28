import collections
from itertools import repeat, chain


# Set variables
n=0

def sortItems():
    # Initialize array
    list=[]
    # Request for input
    n= int(input("Enter number of elements:"))
    # Iterating
    for i in range(0,n):
        element= int(input())
        
        # Adding element to list
        list.append(element)
        
    # Counter for frequency of each element
    freq = collections.Counter(list)
    
    # Sort array according to increasing number and frequency
    result= sorted(list, key=lambda x:(freq[x],x))
    print(str(result))
    
#Function call 
sortItems()