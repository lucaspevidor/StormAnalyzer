const microcontrollerCode = `
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
`