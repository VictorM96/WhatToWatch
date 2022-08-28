import * as React from 'react';
import { Animated } from 'react-native';
import { useTheme } from 'styled-components/native';
import { SpaceProps } from 'styled-system';

import { Box } from 'components/Box';
import { fakeData30 } from 'constants/mocks';

type Param = {
  value: number | string;
  name: string;
};

type VerticalListProps = {
  aspectRatio?: number;
  children?: React.ReactNode;
  getApi?: (a: any, b: any, c?: any) => void;
  handleScroll?: (scrollY: Animated.Value) => void;
  initialNumToRender?: number;
  maxPage?: number;
  numberOfColumns?: number;
  paddingTop?: SpaceProps['pt'];
  param?: string;
  params?: Param[];
  renderItem: React.ElementType;
  resultsData?: any;
  onPress?: (props: any) => void;
};

export function VerticalList({
  aspectRatio,
  children,
  getApi,
  handleScroll,
  initialNumToRender = 20,
  maxPage = 20,
  numberOfColumns = 3,
  onPress,
  paddingTop,
  param,
  params = [],
  renderItem: Item,
  resultsData
}: VerticalListProps) {
  const [scrollY] = React.useState(new Animated.Value(0));
  const [results, setResults] = React.useState(resultsData || 'loading');
  const [page, setPage] = React.useState(1);
  const theme = useTheme();
  const allParams = params.push({ name: 'page', value: page });
  const resultFromParent = !!resultsData;
  const isLoading = results === 'loading' || resultsData === 'loading';
  const dataFormatted = isLoading ? fakeData30 : results;

  React.useEffect(() => {
    handleScroll && handleScroll(scrollY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollY]);

  function renderItem({ item }) {
    return (
      <Box flex={1} maxWidth={`${100 / numberOfColumns}%`} p="xs">
        <Item
          item={item}
          aspectRatio={aspectRatio}
          onPress={() =>
            onPress &&
            onPress({
              id: item?.id,
              name: item?.name,
              mediaType: item?.media_type
            })
          }
          isLoading={isLoading}
        />
      </Box>
    );
  }

  function setNewPage() {
    if (page < maxPage) {
      setPage(page + 1);
    }
  }

  function getNewPageData(newData) {
    setResults(results.concat(newData));
  }

  React.useEffect(() => {
    if (!resultFromParent) {
      if (page === 1) {
        param
          ? getApi(setResults, param, allParams)
          : getApi(setResults, allParams);
      } else if (page < maxPage) {
        param
          ? getApi(getNewPageData, param, allParams)
          : getApi(getNewPageData, allParams);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  React.useEffect(() => {
    setResults(resultsData);
  }, [resultsData]);

  return (
    <Animated.FlatList
      bounces={false}
      data={dataFormatted}
      initialNumToRender={initialNumToRender}
      keyExtractor={(item, index) =>
        isLoading ? `loading_${index}` : `${index}_${item.id}`
      }
      ListHeaderComponent={
        !!children && (
          <Box mb="lg" pt={paddingTop}>
            {children}
          </Box>
        )
      }
      ListFooterComponent={<Box mt="lg" />}
      numColumns={numberOfColumns}
      onEndReached={!resultFromParent && setNewPage}
      onEndReachedThreshold={1}
      columnWrapperStyle={{ paddingHorizontal: theme.space.md }}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: { y: scrollY }
            }
          }
        ],
        {
          useNativeDriver: true
        }
      )}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
}