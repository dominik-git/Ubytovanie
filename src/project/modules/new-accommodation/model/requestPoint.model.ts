import { AttachmentModel } from './attachment.model';

export interface RequestPointModel {
    binarne: boolean;
    dolnaHranica: number;
    hodnota: number;
    hornaHranica: number;
    id: number;
    maxHodnota: number;
    minHodnota: number;
    nazov: string;
    odporucanaHodnota: number;
    pocetBodov: number;
    posun;
    povoleniePrilohy: AttachmentModel;
    prilohy: any[];
    suma: number;
}
