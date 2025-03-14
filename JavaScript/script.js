// insertionSort [CORMEN]
function insertionSort(a) {
  for(j=1; j<a.length; j++) {
    key = a[j];
    i = j-1;
    while(i > -1 && a[i] > key) {
      a[i+1] = a[i];
      i = i-1;
    }
    a[i+1] = key;
  }
}

//----------------------------------------------------------

// selectionSort (almost) AS DESCRIBED BY Pisanti
function selectionSort(a) {
  for(i=0; i<a.length-1; i++) {
    min = a[i];
    minIndex = i;
    for(j=i+1; j<a.length; j++)
      if(a[j] < min) {
        min = a[j];
        minIndex = j;
      }
    temp = a[i];
    a[i] = a[minIndex];
    a[minIndex] = temp;
  }
}

//----------------------------------------------------------

// mergeSort [A more human-friendly version than Cormen’s]
function merge(a1, a2) {
  let result = [];
  let i = 0;
  let j = 0;

  while(i < a1.length && j < a2.length) {
    if(a1[i] > a2[j]) {
      result.push(a2[j]);
      j++;
    } else {
      result.push(a1[i]);
      i++;
    }
  }
  while(i < a1.length) {
    result.push(a1[i]);
    i++;
  }
  while(j < a2.length) {
    result.push(a2[j]);
    j++;
  }

  return result;
}

// a -> gets destroyed [splice]
function mergeSort(a) {
  if(a.length <= 1) 
    return a;
  let q = Math.ceil(a.length / 2);
  let L = mergeSort(a.splice(0, q));
  let R = mergeSort(a.splice(-q));
  
  return merge(L, R);
}

//----------------------------------------------------------

// mergeSort -> JavaScript version
function mergeJS(a1, a2) {
  let sorted = [];
  while(a1.length && a2.length) {
    if(a1[0] < a2[0]) sorted.push(a1.shift());
    else sorted.push(a2.shift());
  }

  return sorted.concat(a1.slice().concat(a2.slice()));
};

// a -> does NOT get destroyed [slice]
function mergeSortJS(a) {
  if(a.length <= 1) 
    return a;
  let q = Math.floor(a.length / 2);
  let L = mergeSortJS(a.slice(0, q));
  let R = mergeSortJS(a.slice(-q));

  return mergeJS(L, R);
};

//----------------------------------------------------------

// mergeSort [Cormen]
// p: starting index of a, 
// r: ending index of a, 
// q: middle index 
function mergeCormen(a, p, q, r) {
  n1 = q - p + 1;
  n2 = r - q;
  let L = [];
  let R = [];
  for(i=0; i<n1; i++) {
    L[i] = a[p+i];
  }
  for(j=0; j<n2; j++) {
    R[j] = a[q+j+1];
  }
  L[n1] = Infinity;
  R[n2] = Infinity;
  i = 0;
  j = 0;
  for(k=p; k<=r; k++) {
    if(L[i] <= R[j]) {
      a[k] = L[i];
      i++;
    } else {
      a[k] = R[j];
      j++;
    }
  }
  
  return a;
}
function mergeSortCormen0(a, p, r) {
  if(p < r) {
    let q = Math.floor((p+r) / 2);
    mergeSortCormen0(a, p, q);
    mergeSortCormen0(a, q+1, r);
    mergeCormen(a, p, q, r);
  }
}
function mergeSortCormen(a) {
  mergeSortCormen0(a, 0, a.length-1);
}

//----------------------------------------------------------

// Quicksort [Cormen]
// p: starting index of a, 
// r: ending index of a
function quickSortCormen0(a, p, r) {
  if(p < r) {
    q = partitionCormen(a, p, r);
    quickSortCormen0(a, p, q-1);
    quickSortCormen0(a, q+1, r);
  }
}
function partitionCormen(a, p, r) {
  x = a[r];
  i = p-1;
  for(j=p; j<r; j++) {
    if(a[j] <= x) {
      i = i+1;
      temp = a[i];
      a[i] = a[j];
      a[j] = temp;
    }
  }
  temp = a[i+1];
  a[i+1] = a[r];
  a[r] = temp;
  return i+1;
}
function quickSortCormen(a) {
  quickSortCormen0(a, 0, a.length-1);
}

//----------------------------------------------------------

// Randomized Quicksort [Cormen]
// p: starting index of a, 
// r: ending index of a
function randomizedPartitionCormen(a, p, r) {
  i = Math.floor(Math.random() * (r-p+1)) + p;
  temp = a[i];
  a[i] = a[r];
  a[r] = temp;
  return partitionCormen(a, p, r);
}
function randomizedQuickSortCormen0(a, p, r) {
  if(p < r) {
    q = randomizedPartitionCormen(a, p, r);
    randomizedQuickSortCormen0(a, p, q-1);
    randomizedQuickSortCormen0(a, q+1, r);
  }
}

function randomizedQuickSortCormen(a) {
  randomizedQuickSortCormen0(a, 0, a.length-1)
}

//----------------------------------------------------------

// Native JS array sort
// Note: The comparison function ensures numerical sorting
//       (12 > 3); without it, sorting would be lexicographic 
//       ("12" < "3")
function nativeSort(a) {
  a.sort((a, b) => a - b);
}

//-Test-time------------------------------------------------

console.log("Test time: Insertion Sort");
time(insertionSort);
/*
console.log("Test time: Selection Sort");
time(selectionSort);

console.log("Test time: Merge Sort");
time(mergeSort);

console.log("Test time: Merge Sort JS");
time(mergeSortJS);

console.log("Test time: Merge Sort Cormen");
time(mergeSortCormen);

console.log("Test time: Quick Sort Cormen");
time(quickSortCormen);

console.log("Test time: Randomized Quick Sort Cormen");
time(randomizedQuickSortCormen);

console.log("Test time: Native Sort");
time(nativeSort);
*/
//----------------------------------------------------------
