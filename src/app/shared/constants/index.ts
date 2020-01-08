import { environment } from '@environments/environment';

export const productRoute: string = environment.host + '/products';
export const phaseRoute: string = environment.host + '/products';
export const knowledgeAreaRoute: string = environment.host + '/productPhase';
export const questionRoute: string = environment.host + '/knowledgeAreas';
