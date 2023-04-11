/*
  Free and Open Source - GNU LGPLv3
  Copyright © 2023
  Afonso Barracha
*/

export interface IAuthorization {
  readonly redirect_uri: string;
  readonly scope: string | string[];
  readonly state: string;
}
