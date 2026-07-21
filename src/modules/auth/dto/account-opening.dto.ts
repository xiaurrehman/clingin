import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SiteContactDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  tel: string;

  @IsEmail()
  email: string;
}

export class PersonnelDto {
  @ValidateNested()
  @Type(() => SiteContactDto)
  director: SiteContactDto;

  @ValidateNested()
  @Type(() => SiteContactDto)
  rp: SiteContactDto;

  @ValidateNested()
  @Type(() => SiteContactDto)
  finance: SiteContactDto;

  @ValidateNested()
  @Type(() => SiteContactDto)
  purchase: SiteContactDto;

  @ValidateNested()
  @Type(() => SiteContactDto)
  warehouse: SiteContactDto;
}

export class AccountOpeningDto {
  @IsIn(['wholesale', 'clinic'])
  customerType: 'wholesale' | 'clinic';

  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsOptional()
  @IsString()
  tradingName?: string;

  @IsNotEmpty()
  @IsString()
  registeredAddress: string;

  @IsOptional()
  @IsString()
  warehouseAddress?: string;

  @IsOptional()
  @IsString()
  telephone?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  companyHouseNo?: string;

  @IsOptional()
  @IsString()
  vatNo?: string;

  @IsOptional()
  @IsString()
  wdaNo?: string;

  @IsOptional()
  @IsString()
  gdpCertNo?: string;

  @IsOptional()
  @IsObject()
  gdpAnswers?: Record<string, string>;

  @IsOptional()
  @IsString()
  licenseRegNo?: string;

  @IsOptional()
  @IsString()
  cqcRegNo?: string;

  @IsOptional()
  @IsString()
  cqcAddress?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => SiteContactDto)
  director?: SiteContactDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => SiteContactDto)
  rp?: SiteContactDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => SiteContactDto)
  finance?: SiteContactDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => SiteContactDto)
  purchase?: SiteContactDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => SiteContactDto)
  warehouse?: SiteContactDto;

  /** Alternative nested shape if frontend sends personnel as a group */
  @IsOptional()
  @ValidateNested()
  @Type(() => PersonnelDto)
  personnel?: PersonnelDto;

  @IsOptional()
  @IsString()
  bankName?: string;

  @IsOptional()
  @IsString()
  sortCode?: string;

  @IsOptional()
  @IsString()
  bankAddress?: string;

  @IsOptional()
  @IsString()
  accountNo?: string;

  @IsOptional()
  @IsBoolean()
  confirmAccurate?: boolean;

  @IsOptional()
  @IsBoolean()
  confirmConsent?: boolean;

  @IsOptional()
  @IsString()
  declName?: string;

  @IsOptional()
  @IsString()
  declPosition?: string;

  @IsOptional()
  @IsString()
  declSign?: string;

  @IsOptional()
  @IsString()
  declDate?: string;
}
