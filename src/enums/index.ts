const Compositions = [
  { id: 'BobEsponja', path: './src/compositions/happy-birthay/bob-esponja/index.ts' },
  { id: 'PlimPlim', path: './src/compositions/happy-birthay/plim-plim/index.ts' },
  { id: 'Jungle', path: './src/compositions/happy-birthay/jungle/index.ts' },
];

export const getCompositionPath = (id: string) => {

  const data: any = Compositions.find(composition => composition.id === id);
  return data.path;
}