void sort(int a[], int aSize) {
	for(int j = 1; j < aSize; j++) {
		int chave = a[j];
		int i = j - 1;
		while (i > -1 && a[i] > chave) {
			a[i + 1] = a[i];
			i--;
		}
	
		a[i +1] = chave;
	}
}
void sortiDec(int a[], int aSize) {
	for(int j = 1; j < aSize; j++) {
		int chave = a[j];
		int i = j - 1;
		while (i > -1 && a[i] < chave) {
			a[i + 1] = a[i];
			i--;
		}
	
		a[i +1] = chave;
	}
}

