#include <stdio.h>
#include "insertionSort.h"

int main(int argc, char argv[]) {
	printf("start\n");
	// ex 2.2-1
	int a[] = {31, 41, 59, 26, 41, 58};
	int aSize = 6;
	sort(a, aSize);
	for(int i = 0; i < aSize; i++) {
		printf("at %d - value %d \n", i, a[i]);
	}
	return 0;
}
