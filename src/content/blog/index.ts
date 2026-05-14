import { article as flightDivertedRightsArticle, image as flightDivertedRightsImage } from "./flight-diverted-rights";
import { article as airlineStrikeCompensationArticle, image as airlineStrikeCompensationImage } from "./airline-strike-compensation";
import { article as flightMovedEarlierRightsArticle, image as flightMovedEarlierRightsImage } from "./flight-moved-earlier-rights";
import { article as downgradedSeatCompensationArticle, image as downgradedSeatCompensationImage } from "./downgraded-seat-compensation";
import { article as delayedBaggageAfterFlightArticle, image as delayedBaggageAfterFlightImage } from "./delayed-baggage-after-flight";
import { article as childrenInfantFlightCompensationArticle, image as childrenInfantFlightCompensationImage } from "./children-infant-flight-compensation";
import { article as flightDelayCompensationArticle, image as flightDelayCompensationImage } from "./flight-delay-compensation";
import { article as cancelledFlightRightsArticle, image as cancelledFlightRightsImage } from "./cancelled-flight-rights";
import { article as missedConnectionArticle, image as missedConnectionImage } from "./missed-connection";
import { article as deniedBoardingOverbookingArticle, image as deniedBoardingOverbookingImage } from "./denied-boarding-overbooking";
import { article as extraordinaryCircumstancesArticle, image as extraordinaryCircumstancesImage } from "./extraordinary-circumstances";
import { article as eu261EcaaSerbiaArticle, image as eu261EcaaSerbiaImage } from "./eu261-ecaa-serbia";
import { article as documentsForClaimArticle, image as documentsForClaimImage } from "./documents-for-claim";
import { article as refundVsCompensationArticle, image as refundVsCompensationImage } from "./refund-vs-compensation";
import { article as claimDeadlinesArticle, image as claimDeadlinesImage } from "./claim-deadlines";
import { article as airportActionPlanArticle, image as airportActionPlanImage } from "./airport-action-plan";
import { article as howToFileAirlineClaimArticle, image as howToFileAirlineClaimImage } from "./how-to-file-airline-claim";
import { article as airlineRejectedClaimArticle, image as airlineRejectedClaimImage } from "./airline-rejected-claim";
import { article as voucherOrCashCompensationArticle, image as voucherOrCashCompensationImage } from "./voucher-or-cash-compensation";
import { article as airlineResponseNoAnswerArticle, image as airlineResponseNoAnswerImage } from "./airline-response-no-answer";
import { article as useClaimServiceOrDiyArticle, image as useClaimServiceOrDiyImage } from "./use-claim-service-or-diy";
import { article as claimTemplateEmailArticle, image as claimTemplateEmailImage } from "./claim-template-email";
import { articles as daily20260502Articles, images as daily20260502Images } from "./daily-2026-05-02";
import { articles as daily20260503Articles, images as daily20260503Images } from "./daily-2026-05-03";
import { articles as daily20260504Articles, images as daily20260504Images } from "./daily-2026-05-04";
import { articles as daily20260505Articles, images as daily20260505Images } from "./daily-2026-05-05";
import { articles as daily20260507Articles, images as daily20260507Images } from "./daily-2026-05-07";
import { articles as daily20260508Articles, images as daily20260508Images } from "./daily-2026-05-08";
import { articles as daily20260509Articles, images as daily20260509Images } from "./daily-2026-05-09";
import { articles as daily20260511Articles, images as daily20260511Images } from "./daily-2026-05-11";
import { articles as daily20260514Articles, images as daily20260514Images } from "./daily-2026-05-14";

import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const blogArticles: BlogArticle[] = [
  flightDivertedRightsArticle,
  airlineStrikeCompensationArticle,
  flightMovedEarlierRightsArticle,
  downgradedSeatCompensationArticle,
  delayedBaggageAfterFlightArticle,
  childrenInfantFlightCompensationArticle,
  flightDelayCompensationArticle,
  cancelledFlightRightsArticle,
  missedConnectionArticle,
  deniedBoardingOverbookingArticle,
  extraordinaryCircumstancesArticle,
  eu261EcaaSerbiaArticle,
  documentsForClaimArticle,
  refundVsCompensationArticle,
  claimDeadlinesArticle,
  airportActionPlanArticle,
  howToFileAirlineClaimArticle,
  airlineRejectedClaimArticle,
  voucherOrCashCompensationArticle,
  airlineResponseNoAnswerArticle,
  useClaimServiceOrDiyArticle,
  claimTemplateEmailArticle,
  ...daily20260514Articles,
  ...daily20260511Articles,
  ...daily20260509Articles,
  ...daily20260508Articles,
  ...daily20260507Articles,
  ...daily20260505Articles,
  ...daily20260504Articles,
  ...daily20260503Articles,
  ...daily20260502Articles,
];

export const articleImages: Record<string, BlogArticleImage> = {
  "flight-diverted-rights": flightDivertedRightsImage,
  "airline-strike-compensation": airlineStrikeCompensationImage,
  "flight-moved-earlier-rights": flightMovedEarlierRightsImage,
  "downgraded-seat-compensation": downgradedSeatCompensationImage,
  "delayed-baggage-after-flight": delayedBaggageAfterFlightImage,
  "children-infant-flight-compensation": childrenInfantFlightCompensationImage,
  "flight-delay-compensation": flightDelayCompensationImage,
  "cancelled-flight-rights": cancelledFlightRightsImage,
  "missed-connection": missedConnectionImage,
  "denied-boarding-overbooking": deniedBoardingOverbookingImage,
  "extraordinary-circumstances": extraordinaryCircumstancesImage,
  "eu261-ecaa-serbia": eu261EcaaSerbiaImage,
  "documents-for-claim": documentsForClaimImage,
  "refund-vs-compensation": refundVsCompensationImage,
  "claim-deadlines": claimDeadlinesImage,
  "airport-action-plan": airportActionPlanImage,
  "how-to-file-airline-claim": howToFileAirlineClaimImage,
  "airline-rejected-claim": airlineRejectedClaimImage,
  "voucher-or-cash-compensation": voucherOrCashCompensationImage,
  "airline-response-no-answer": airlineResponseNoAnswerImage,
  "use-claim-service-or-diy": useClaimServiceOrDiyImage,
  "claim-template-email": claimTemplateEmailImage,
  ...daily20260514Images,
  ...daily20260511Images,
  ...daily20260509Images,
  ...daily20260508Images,
  ...daily20260507Images,
  ...daily20260505Images,
  ...daily20260504Images,
  ...daily20260503Images,
  ...daily20260502Images,
};
