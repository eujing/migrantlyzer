import React from "react"
import MigrationBarContainer from "../containers/MigrationBarContainer.jsx"
import MigrationFactorsList from "../containers/MigrationFactorsList.jsx"
import IndexCategoryList from "../containers/IndexCategoryList.jsx"

export default class DataDisplay extends React.Component {

	constructor() {
	  	super();
	  	this.state = {
		  	originCountry: "Singapore",
		  	destinationCountry: "Thailand",
		  	migrationData: data.migrationData,
		  	indexData: data.indexData,
		  	categoryMap: categoryMap,
	  	}
	}

	extractIndexData(origin, destination, oldData) {
		var exclusiveData = {}
		exclusiveData[origin] = oldData[origin];
		exclusiveData[destination] = oldData[destination];
		return exclusiveData;
	}

    render() {
    	
    	var originCountry = this.state.originCountry;
    	var destinationCountry = this.state.destinationCountry;
		var migrationData = this.state.migrationData;
    	var indexData = this.state.indexData;
		var categoryMapProp = this.state.categoryMap;
		var year = this.props.year;
    	

    	var emigration = migrationData[originCountry][destinationCountry];
    	var immigration = migrationData[destinationCountry][originCountry];

    	var exclusiveIndexData = this.extractIndexData(originCountry, destinationCountry, indexData);

        return (
            <div>
                <h1>DataDisplay</h1>
                <MigrationBarContainer />
                <MigrationFactorsList />
                <IndexCategoryList />
            </div>)
    }
}

var categoryMap = {
	"Economic": ["GDP per Capita"],
	"Social": ["Human Development Index", "Average PISA score"]
}

var data = 	{

  	migrationData: {
  		"Singapore": {
  			"Malaysia": 4000,
  			"Indonesia": 5000,
  			"Thailand": 6000,
  		},
  		"Malaysia": {
  			"Singapore": 1400,
  			"Indonesia": 1500,
  			"Thailand": 1600
  		},
  		"Indonesia": {
  			"Singapore": 6500,
  			"Malaysia": 6400,
  			"Thailand": 6300
  		},
  		"Thailand": {
  			"Singapore": 7000,
  			"Malaysia": 6000,
  			"Thailand": 5000
  		}
  	},

  	indexData: {
  		"Singapore": {
  			"GDP per Capita": {
  				"2000": {
  					"value": 20000,
  					"rank": 1
  				},
  				"2005": {
  					"value": 25000,
  					"rank": 1
  				},
  				"2010": {
  					"value": 30000,
  					"rank": 1
  				},
  				"2015": {
  					"value": 35000,
  					"rank": 1
  				}
  			},
  			"Human Development Index": {
  				"2015": {
  					"value": 5,
  					"rank": 1
  				}
  			},
  			"Average PISA score": {
  				"2015": {
  					"value": 800,
  					"rank": 1
  				}
  			}
  		},
  		"Malaysia": {
  			"GDP per Capita": {
  				"2000": {
  					"value": 500,
  					"rank": 4
  				},
  				"2005": {
  					"value": 1000,
  					"rank": 4
  				},
  				"2010": {
  					"value": 1500,
  					"rank": 4
  				},
  				"2015": {
  					"value": 2000,
  					"rank": 4
  				}
  			},
  			"Human Development Index": {
  				"2015": {
  					"value": 1,
  					"rank": 4
  				}
  			},
  			"Average PISA score": {
  				"2015": {
  					"value": 600,
  					"rank": 3
  				}
  			}
  		},
  		"Indonesia": {
  			"GDP per Capita": {
  				"2000": {
  					"value": 15000,
  					"rank": 2
  				},
  				"2005": {
  					"value": 20000,
  					"rank": 2
  				},
  				"2010": {
  					"value": 25000,
  					"rank": 2
  				},
  				"2015": {
  					"value": 30000,
  					"rank": 2
  				}
  			},
  			"Human Development Index": {
  				"2015": {
  					"value": 2,
  					"rank": 3
  				}
  			},
  			"Average PISA score": {
  				"2015": {
  					"value": 720,
  					"rank": 2
  				}
  			}
  		}, //Indonesia end	 
  		"Thailand": {
  			"GDP per Capita": {
  				"2000": {
  					"value": 5000,
  					"rank": 3
  				},
  				"2005": {
  					"value": 6000,
  					"rank": 3
  				},
  				"2010": {
  					"value": 7000,
  					"rank": 3
  				},
  				"2015": {
  					"value": 8000,
  					"rank": 3
  				}
  			},
  			"Human Development Index": {
  				"2015": {
  					"value": 4,
  					"rank": 2
  				}
  			},
  			"Average PISA score": {
  				"2015": {
  					"value": 200,
  					"rank": 4
  				}
  			}
  		} 		
  	} //indexData end


}

