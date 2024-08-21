int search(int a[], int aSize, int value) {
	for (int i=0; i < aSize; i++) {
		if (a[i] == value)
			return i;
		if (a[i] > value)
			break;
	}
	return -1;
}
