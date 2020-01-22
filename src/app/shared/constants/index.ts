import { environment } from '@environments/environment';

export const productRoute: string = environment.host + '/products';
export const phaseRoute: string = environment.host + '/products';
export const knowledgeAreaRoute: string = environment.host + '/productPhase';
export const questionRoute: string = environment.host + '/knowledgeAreas';
export const evidenceRoute: string = environment.host + '/product';
export const evidenceBaseRoute: string = environment.host + '/question';
export const questionRoute2: string = environment.host + '/question';
