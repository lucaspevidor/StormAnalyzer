# StormAnalyzer

Hello dear person! Just so you know, I'm actually an Automation Engineer and I'm not experienced with web development. I made the application in 1 hour, so please don't judge my code :P

Feel free to contribute!

## Welcome to StormAnalyzer
StormAnalyzer is a tool to be used together with StormWorks for analyzing vehicle data. The data can be exported to a CSV file using StormAnalyzer, and then can be used in MatLab to be processed, or to tune controllers, etc.

To export the data you have to run the application first executing the .bat file in the root folder. If the application is running correctly you should see the following message:

```
> Server is listening on port 80
```

The application provides the following endpoint for datalogging:

```javascript
> /addDataPoint?name={fileName}&x={tick}&d1={d1}&d2={d2}&d3={d3}&d4={d4}
```

That way, you can log data by sending ```GET``` requests to the endpoint:

```javascript
/addDataPoint?name=mydata&x=0&d1=1.1&d2=2.1&d3=5&d4=0
/addDataPoint?name=mydata&x=1&d1=1.3&d2=2.0&d3=4&d4=0.05
/addDataPoint?name=mydata&x=2&d1=1.5&d2=2.2&d3=3&d4=0.1
/addDataPoint?name=mydata&x=3&d1=1.7&d2=2.4&d4=0.15
/addDataPoint?name=mydata&x=4&d1=1.1&d2=2.1&d3=5&d4=0
```

The application will log the provided data to a file named ```mydata.csv```, located inside the folder ```data``` of the application. If you look closely, you can omit parameters from ```d1``` to ```d4```. You can also omit x, but it isn't recommended, since it corresponds to the index of the data. The ommited parameters will be logged as 0. You can access the link below to try it. A file named ```data.csv``` will be created in the ```data``` folder of the application.

Here is an example of the data that would be logged:

```bash
# Contents of /StormAnalyzer/data/mydata.csv

0;1.1;2.1;5;0
1;1.3;2.0;4;0.05
2;1.5;2.2;3;0.1
3;1.7;2.4;0.15
4;1.1;2.1;5;0
```

## Using the app with StormWorks
In order to export data from StormWorks to StormAnalyzer, you have to build a microcontroller that takes a numeric input and sends it to a Lua Block, where it will then be sent to StormAnalyzer as a ```GET``` request. Here is an example of the MC logic and Lua code:

![Microcontroller logic](/pages/startPage/res/logic.png "Microcontroller logic")

```lua
tick = 0

name = property.getText('DataName')

-- Tick function that will be executed every logic tick
function onTick()
    d1 = input.getNumber(1)
    d2 = input.getNumber(2)
    d3 = input.getNumber(3)
    d4 = input.getNumber(4)
    enable = input.getBool(1)			 
    
    if (enable == false) then tick = 0 end
    if (enable == true) then
        -- Log to API
        if (tick % 1 == 0) then
            async.httpGet(80, '/addDataPoint?name='..name..'&x='..tick..'&d1='..d1..'&d2='..d2..'&d3='..d3..'&d4='..d4)
        end
        tick = tick + 1
    end
end
```

Basically the Microcontroller has 4 numeric inputs for the data to be logged and 1 for enabling the data logging. They are sent to the Lua block, where they are processed and then sent to the StormAnalyzer with the function ```async.httpGet```.