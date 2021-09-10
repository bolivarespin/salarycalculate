# salarycalculate

This code is for calculate the salary from people according the values per hour and per day of the week that the they work. There is a table with those values.

The implementation of the code is as follow:

1. The data for the people is given into a text file called salary.txt, the same has the next format:

[EMPLOYEE_NAME]=[DAY][RANGE_WORK_HOURS],[DAY][RANGE_WORK_HOURS], ...

Example:

RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00

2. The file called util.js is a class called Util that contains a property called workPeriods for the parametrization data (days and rango of works hours with the respective cost), also contains another property called results it is an array in order to receipt objects with the calculed values for each day, finally contains two methods: processLine that request as parameter the line from the file, split and map this line into data required and call the next method getDataByDay that take the parameters: day, from, to and with these values it makes the calculates.

3. The file index.js for read the file, instance the class Util and line by line calls the methods before named in order to get the results.

EXECUTE
This solution is for Node.js and when download the files put the three files into the same directory, open the command line window, go to the directory that contains the files before downloaded and write the next instruction:

node index.js 

then the results will show at the console.
