import {
  SafeAreaView, View, Text, StyleSheet,
  Dimensions,
} from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';
import FilterTab from '../../components/Placeholders/FilterTab';
import ChartPlaceholder from '../../components/Placeholders/ChartPlaceholder';
import React from 'react';

export default function OverviewScreen() {
  const screenWidth = Dimensions.get('window').width;

  const pieChartData = [
    {
      name: 'Saving', population: 215, color: '#ff6384', legendFontColor: '#7F7F7F', legendFontSize: 15,
    },
    {
      name: 'Food', population: 280, color: '#36a2eb', legendFontColor: '#7F7F7F', legendFontSize: 15,
    },
    {
      name: 'Bills', population: 150, color: '#4bc0c0', legendFontColor: '#7F7F7F', legendFontSize: 15,
    },
  ];

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#0f003f',
    backgroundGradientTo: '#0f003f',
    color: (opacity = 1) => `rgba(173, 216, 230, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const styles = StyleSheet.create({
    chart: {
      borderRadius: 16,
      marginVertical: 8,
    },
    container: {
      backgroundColor: '#0f003f',
      flex: 1,
      padding: 20,
    },
    header: {
      color: '#ffffff',
      fontSize: 24,
      margin: 10,
      marginBottom: 10,
    },
    tabsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
    },
    watermark: {
      position: 'absolute',
      top: '70%',
      left: '50%',
      transform: [{ translateX: -screenWidth * 0.5 }, { translateY: -100 }],
      zIndex: 999,
      opacity: 0.5,
      fontSize: 40,
      color: '#ffffff',
      fontWeight: 'bold',
      textAlign: 'center',
      width: screenWidth,
    },
 
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Your Spendings</Text>
      <Text style={styles.watermark}>DEVELOPMENT IN PROGRESS</Text>
      <View style={styles.tabsContainer}>
        <FilterTab label="Daily" onPress={() => console.log('Daily')} />
        <FilterTab label="Weekly" onPress={() => console.log('Weekly')} />
        <FilterTab label="Monthly" onPress={() => console.log('Monthly')} />
      </View>

      <PieChart
        data={pieChartData}
        width={screenWidth}
        height={200}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="10"
        center={[10, 10]}
        absolute
      />

      <BarChart
        style={styles.chart}
        data={barChartData}
        width={screenWidth}
        height={220}
        yAxisLabel="$"
        chartConfig={chartConfig}
        verticalLabelRotation={0}
      />
    </SafeAreaView>
  );
}
