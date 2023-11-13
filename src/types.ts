export type dataProps = {
    currentRecords: number;
    loading: boolean;
    records: [{
      results: any[];
      previous: string | null;
      next: string | null;
      count: number | null;
    }] | any[];
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  }

  export type PlanetDataProps = {
    name: string;
    climate: string;
    population: string;
    diameter: string;
  }

  export type KeyProps =  { 
    title: string; 
    order: number, 
    isAscOrder?: boolean 
  }

  //canvas 

  export type Star = {
    x: number;
    y: number;
    size: number;
    speed: number;
  }