const Compositions = [
  { id: 'BobEsponja1', path: './src/compositions/happy-birthay/bob-esponja-1/index.ts' },
  { id: 'PlimPlim1', path: './src/compositions/happy-birthay/plim-plim-1/index.ts' },
  { id: 'Jungle1', path: './src/compositions/happy-birthay/jungle-1/index.ts' },
];

export const getCompositionPath = (id: string) => {

  const data: any = Compositions.find(composition => composition.id === id);
  return data.path;
}