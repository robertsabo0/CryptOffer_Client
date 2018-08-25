
import { Buying } from "src/app/model/Buying";
import { DateValue } from "src/app/model/DateValue";
import { Coin } from "src/app/model/Coin";

export class CoinDetailed  extends Coin{
    priceBefore7days:number;
    histori : DateValue[];
    currentResult : number;
    currentResultPercentage : number;
    differenceBetween7daysAndNow : number;
    linkToCoinMarketCup : string;
    buyings:Buying[];
}