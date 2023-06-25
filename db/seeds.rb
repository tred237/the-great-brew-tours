require 'byebug'


# brewery_data_raw = File.read("./assets/brewery_data.json")
parsed_brewery_data = JSON.parse(File.read('db/assets/brewery_data.json')).filter{|e| e["city"] && e['name']}
byebug
0