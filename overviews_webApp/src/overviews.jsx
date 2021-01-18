/*
# Component (user guide)

# Overviews

## Description  

Overviews contiene el enrutamiento de las direcciones URL 

## Category   
Estructural

## Live demo 
N/A

## Installation 
npm install react-router-dom

## Usage 

<Overviews>  </Overviews> 

## Props 
N/A

## Exception

__Category: [Error, Warning or Message]__
[Description of the exception (if necessary)]

## License

MIT License

## Author 

RegulonDB Team: 
EDGAR ENRRIQUE HERNANDEZ MARCELO
GABRIEL 

# Component (technical guide)

## Component Type 

[stateful, stateless, pure, HOC]

## Dependencies

[Dependencies details]

## States
N/A

# Functions description

## [function name]

*/ 

import {
    Switch,
    Route
} from "react-router-dom";
import Main from './components/overview_main';
import Graphic from './components/overview_graphic';
import './styles/regulondbGlobalStyle.css';
import './styles/overviewsStyles.css';

const Overviews = () => {
   return(
     <>
     <Switch>
        <Route exact path={"/overviews"}>
          <Main />
        </Route>
        <Route path={"/overviews/:id"}>
          <Graphic />
        </Route>
      </Switch>
     </>
   )

}
 
export default Overviews;