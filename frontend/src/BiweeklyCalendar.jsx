import { Box, Grid, Text, Flex, VStack, Input } from '@chakra-ui/react';

const BiWeeklyCalendar = () => {
  // Function to get the dates for the current week and the next week
  const getCurrentWeekDates = () => {
    const currentDate = new Date();
    const sunday = new Date(currentDate);
    sunday.setDate(currentDate.getDate() - currentDate.getDay());
    const monday = new Date(sunday);
    monday.setDate(monday.getDate() + 1);

    const nextSunday = new Date(sunday);
    nextSunday.setDate(nextSunday.getDate() + 7);
    const nextMonday = new Date(nextSunday);
    nextMonday.setDate(nextMonday.getDate() + 1);

    return { currentWeek: { sunday, monday }, nextWeek: { nextSunday, nextMonday } };
  };

  // Function to format date to "MM/DD" format
  const formatDate = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const { currentWeek, nextWeek } = getCurrentWeekDates();

  return (
    <Box>
      <Grid templateColumns="repeat(7, 1fr)" gap={2}>
        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
          <Text key={day}>{day}</Text>
        ))}
      </Grid>
      <Grid templateColumns="repeat(7, 1fr)" gap={2}>
        {[currentWeek.sunday, currentWeek.monday, ...Array(5).fill().map((_, i) => new Date(currentWeek.monday.getTime() + (i + 2) * 86400000))].map((date) => (
          <Flex key={date} direction="column" alignItems="center">
            <Text textAlign="center">{formatDate(date)}</Text>
            <VStack spacing={2}>
              <Input placeholder="Lunch menu" />
              {/* You can add more components for other menu items */}
            </VStack>
          </Flex>
        ))}
      </Grid>
      <Grid templateColumns="repeat(7, 1fr)" gap={2}>
        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
          <Text key={day}>{day}</Text>
        ))}
      </Grid>
      <Grid templateColumns="repeat(7, 1fr)" gap={2}>
        {[nextWeek.nextSunday, nextWeek.nextMonday, ...Array(5).fill().map((_, i) => new Date(nextWeek.nextMonday.getTime() + (i + 2) * 86400000))].map((date) => (
          <Flex key={date} direction="column" alignItems="center">
            <Text textAlign="center">{formatDate(date)}</Text>
            <VStack spacing={2}>
                <Input placeholder="Lunch menu" />
                {/* You can add more components for other menu items */}
            </VStack>
          </Flex>
        ))}
      </Grid>
    </Box>
  );
};

export default BiWeeklyCalendar;
