
# find the element that occurs only once!

input = [2, 7, 7, 2, 3, 2, 7]
inputLen = len(input)
i = 0
print('input before loop')
print(input)
count = [0, 0, 0]
targetElementIdx = inputLen - 1
while i < inputLen - 1: # run *number of distinct elements in input* times = q
    startAt = i
    count[0] += 1
    for j in range(i + 1, inputLen): 
        # run *number of repet*
        count[1] += 1
        if input[j] == input[i]:
            count[2] += 1
            #print(i)
            i = i + 1
            input[j] = input[i]
            input[i] = input[i - 1]
    if startAt == i:
        print('the target element is at the position ' + str(i))
        targetElementIdx = startAt
        break
    i = i + 1
print('input after loop')
print(input)
print('count ' + str(count))
print('the target element is ' + str(input[targetElementIdx]) + ' at ' + str(targetElementIdx))
