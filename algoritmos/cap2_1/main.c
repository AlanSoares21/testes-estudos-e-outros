#include <stdio.h>
#include "insertionSort.h"
#include "search.h"

int main(int argc, char argv[]) {
	printf("start\n");
	// ex 2.2-1
	int a[] = {31, 41, 59, 26, 41, 58};
	int aSize = 6;
	sort(a, aSize);
	for(int i = 0; i < aSize; i++) {
		printf("at %d - value %d \n", i, a[i]);
	}
	int searchTo = 58;
	printf("searching for %d", searchTo);
	int response = search(a, aSize, searchTo);
	if (response == -1)
		printf("value %d not found in the array \n", searchTo);
	else
		printf("value %d found at %d \n", searchTo, response);
	return 0;
}
