export function chunkArray(array: any, chunkSize: number) {
  return [].concat.apply([],
    array.map(function(elem: any, i: any) {
      return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
    })
  );
}