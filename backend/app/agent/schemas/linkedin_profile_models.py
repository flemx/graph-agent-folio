

from __future__ import annotations

from typing import List, Optional, Literal

from pydantic import BaseModel, Field, ConfigDict

# ---------------------------------------------------------------------------
# Generic / utility sub-models
# ---------------------------------------------------------------------------


class DateModel(BaseModel):
    """Represents a calendar date where any component can be missing."""

    month: Optional[int] = Field(None, ge=1, le=12)
    day: Optional[int] = Field(None, ge=1, le=31)
    year: Optional[int] = None


class DateRangeModel(BaseModel):
    """A start / end date pair."""

    start: Optional[DateModel] = None
    end: Optional[DateModel] = None


class AddressModel(BaseModel):
    country: Optional[str] = None
    geographic_area: Optional[str] = None
    city: Optional[str] = None
    postal_code: Optional[str] = None
    line1: Optional[str] = None
    line2: Optional[str] = None
    description: Optional[str] = None


class CountRangeModel(BaseModel):
    start: Optional[int] = None
    end: Optional[int] = None


# ---------------------------------------------------------------------------
# Locale / language related models
# ---------------------------------------------------------------------------


class LocaleModel(BaseModel):
    country: Optional[str] = None
    language: Optional[str] = None


class ProfileLanguageModel(BaseModel):
    name: Optional[str] = None
    proficiency: Optional[str] = None


class LanguagesModel(BaseModel):
    primary_locale: Optional[LocaleModel] = None
    supported_locales: Optional[List[LocaleModel]] = None
    profile_languages: Optional[List[ProfileLanguageModel]] = None


# ---------------------------------------------------------------------------
# Media, skills, treasury
# ---------------------------------------------------------------------------


class TreasuryMediaModel(BaseModel):
    url: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None


# ---------------------------------------------------------------------------
# Company & organisation models
# ---------------------------------------------------------------------------


class CompanyModel(BaseModel):
    id: Optional[int] = None
    name: Optional[str] = None
    logo: Optional[str] = None
    url: Optional[str] = None


class CompanyExtendedModel(CompanyModel):
    employees: Optional[CountRangeModel] = None


class CompanyBaseDetailsModel(CompanyModel):
    description: Optional[str] = None
    phone: Optional[str] = None
    followers: Optional[int] = None
    industries: Optional[List[str]] = None
    # Images and URL sub-structures pared down for brevity – feel free to expand


# ---------------------------------------------------------------------------
# Education & certification models
# ---------------------------------------------------------------------------


class SchoolModel(BaseModel):
    name: Optional[str] = None
    logo: Optional[str] = None
    url: Optional[str] = None


class EducationModel(BaseModel):
    date: Optional[DateRangeModel] = None
    school: Optional[SchoolModel] = None
    degree_name: Optional[str] = None
    description: Optional[str] = None
    field_of_study: Optional[str] = None
    grade: Optional[str] = None


class InventorModel(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    headline: Optional[str] = None
    profile_picture: Optional[str] = None


class PatentModel(BaseModel):
    inventors: Optional[List[InventorModel]] = None
    patent_number: Optional[str] = None
    title: Optional[str] = None
    issuer: Optional[str] = None
    date: Optional[DateModel] = None
    application_number: Optional[str] = None


class AwardModel(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    issuer: Optional[str] = None
    date: Optional[DateModel] = None


class CertificationCompanyModel(CompanyModel):
    """A very small subset of company fields used inside a certification."""


class CertificationModel(BaseModel):
    name: Optional[str] = None
    date: Optional[DateRangeModel] = None
    authority: Optional[str] = None
    url: Optional[str] = None
    license_number: Optional[str] = None
    display_source: Optional[str] = None
    company: Optional[CertificationCompanyModel] = None


class OrganizationModel(BaseModel):
    name: Optional[str] = None
    position: Optional[str] = None
    date_start: Optional[DateModel] = None
    date_end: Optional[DateModel] = None


# ---------------------------------------------------------------------------
# Projects, publications & contributors
# ---------------------------------------------------------------------------


class ContributorModel(BaseModel):
    type: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    name: Optional[str] = None
    headline: Optional[str] = None


class ProjectModel(BaseModel):
    title: Optional[str] = None
    date: Optional[DateRangeModel] = None
    description: Optional[str] = None
    contributors: Optional[List[ContributorModel]] = None


class PublicationModel(BaseModel):
    name: Optional[str] = None
    publisher: Optional[str] = None
    url: Optional[str] = None
    date: Optional[DateModel] = None
    authors: Optional[List[ContributorModel]] = None


# ---------------------------------------------------------------------------
# Courses & tests
# ---------------------------------------------------------------------------


class CourseModel(BaseModel):
    name: Optional[str] = None
    number: Optional[str] = None


class TestScoreModel(BaseModel):
    name: Optional[str] = None
    score: Optional[str] = None
    date: Optional[DateModel] = None


# ---------------------------------------------------------------------------
# Professional experience (positions)
# ---------------------------------------------------------------------------


class ProfilePositionModel(BaseModel):
    location: Optional[str] = None
    date: Optional[DateRangeModel] = None
    company: Optional[str] = None
    description: Optional[str] = None
    title: Optional[str] = None
    employment_type: Optional[str] = None


class PositionGroupModel(BaseModel):
    company: Optional[CompanyExtendedModel] = None
    date: Optional[DateRangeModel] = None
    profile_positions: Optional[List[ProfilePositionModel]] = None


# ---------------------------------------------------------------------------
# Volunteer work
# ---------------------------------------------------------------------------


class VolunteerModel(BaseModel):
    date: Optional[DateRangeModel] = None
    role: Optional[str] = None
    company: Optional[CompanyModel] = None
    cause: Optional[str] = None
    description: Optional[str] = None


# ---------------------------------------------------------------------------
# Networking / contact / verification
# ---------------------------------------------------------------------------


class NetworkModel(BaseModel):
    followable: Optional[bool] = None
    followers_count: Optional[int] = None
    connections_count: Optional[int] = None


class RelatedProfileModel(BaseModel):
    profile_id: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    sub_title: Optional[str] = None
    profile_picture: Optional[str] = None
    background_image: Optional[str] = None


class WebsiteModel(BaseModel):
    type: Optional[str] = None
    url: Optional[str] = None


class PhoneNumberModel(BaseModel):
    number: Optional[str] = None
    type: Optional[str] = None


class ContactModel(BaseModel):
    websites: Optional[List[WebsiteModel]] = None
    email: Optional[str] = None
    twitter: Optional[str] = None
    phone_numbers: Optional[List[PhoneNumberModel]] = None


class VerificationModel(BaseModel):
    text: Optional[str] = None
    sub_text: Optional[str] = None


class VerificationsInfoModel(BaseModel):
    is_verified: bool = False
    verifications: Optional[List[VerificationModel]] = None


# ---------------------------------------------------------------------------
# Root model – Personal profile
# ---------------------------------------------------------------------------


class PersonalProfileModel(BaseModel):
    model_config = ConfigDict(extra="allow")
    """Full model for a *personal* LinkedIn profile returned by the API."""

    # --- Basic identity -----------------------------------------------------
    profile_id: str
    first_name: str
    last_name: str

    # --- Headline / visuals -------------------------------------------------
    sub_title: Optional[str] = None
    profile_picture: Optional[str] = None
    background_image: Optional[str] = None

    # --- Meta ---------------------------------------------------------------
    profile_type: Literal["personal"] = "personal"
    open_to_work: Optional[bool] = None
    entity_urn: Optional[str] = None
    object_urn: Optional[int] = None
    birth_date: Optional[DateModel] = None
    summary: Optional[str] = None

    # --- Location & status --------------------------------------------------
    location: Optional[AddressModel] = None
    premium: Optional[bool] = None
    influencer: Optional[bool] = None

    # --- Rich content -------------------------------------------------------
    treasury_media: Optional[List[TreasuryMediaModel]] = None
    languages: Optional[LanguagesModel] = None
    industry: Optional[str] = None

    # --- Achievements & qualifications -------------------------------------
    education: Optional[List[EducationModel]] = None
    patents: Optional[List[PatentModel]] = None
    awards: Optional[List[AwardModel]] = None
    certifications: Optional[List[CertificationModel]] = None
    organizations: Optional[List[OrganizationModel]] = None
    projects: Optional[List[ProjectModel]] = None
    publications: Optional[List[PublicationModel]] = None
    courses: Optional[List[CourseModel]] = None
    test_scores: Optional[List[TestScoreModel]] = None

    # --- Career -------------------------------------------------------------
    position_groups: Optional[List[PositionGroupModel]] = None
    has_more_positions: Optional[bool] = None

    # --- Volunteer / extracurricular ---------------------------------------
    volunteer_experiences: Optional[List[VolunteerModel]] = None

    # --- Skills & network ---------------------------------------------------
    skills: Optional[List[str]] = None
    network_info: Optional[NetworkModel] = None

    # --- Relationships ------------------------------------------------------
    related_profiles: Optional[List[RelatedProfileModel]] = None

    # --- Contact & verification --------------------------------------------
    contact_info: Optional[ContactModel] = None
    verifications_info: Optional[VerificationsInfoModel] = None

    # -----------------------------------------------------------------------
    # Convenience helpers ----------------------------------------------------
    # -----------------------------------------------------------------------

    def full_name(self) -> str:
        """Return the display name that LinkedIn shows (first + last)."""

        return f"{self.first_name} {self.last_name}".strip()


# Convenience alias
ProfileDetailsResponse = PersonalProfileModel

__all__ = [
    "DateModel",
    "DateRangeModel",
    "LocaleModel",
    "ProfileLanguageModel",
    "LanguagesModel",
    "TreasuryMediaModel",
    "CompanyModel",
    "CompanyExtendedModel",
    "CompanyBaseDetailsModel",
    "SchoolModel",
    "EducationModel",
    "InventorModel",
    "PatentModel",
    "AwardModel",
    "CertificationModel",
    "OrganizationModel",
    "ContributorModel",
    "ProjectModel",
    "PublicationModel",
    "CourseModel",
    "TestScoreModel",
    "ProfilePositionModel",
    "PositionGroupModel",
    "VolunteerModel",
    "NetworkModel",
    "RelatedProfileModel",
    "WebsiteModel",
    "PhoneNumberModel",
    "ContactModel",
    "VerificationModel",
    "VerificationsInfoModel",
    "PersonalProfileModel",
    "ProfileDetailsResponse",
]