import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import FilterTab from '../../components/Placeholders/FilterTab';
import ChartPlaceholder from '../../components/Placeholders/ChartPlaceholder';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';


export default function OverviewScreen() {

  const screenWidth = Dimensions.get("window").width;

  const pieChartData = [
    { name: 'Saving', population: 215, color: '#ff6384', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Food', population: 280, color: '#36a2eb', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Bills', population: 150, color: '#4bc0c0', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ];

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99],
      }
    ]
  };

  const chartConfig = {
    backgroundGradientFrom: "#0f003f",
    backgroundGradientTo: "#0f003f",
    color: (opacity = 1) => `rgba(173, 216, 230, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0f003f',
      padding: 20
    },
    header: {
      fontSize: 24,
      color: '#ffffff',
      marginBottom: 20
    },
    tabsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20
    },
    chart: {
      marginVertical: 8,
      borderRadius: 16
    }
  });


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Your Spendings</Text>
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
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"10"}
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
};