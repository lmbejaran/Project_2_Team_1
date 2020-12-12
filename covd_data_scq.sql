create table Covid_Data(
	DATE_OF_INTEREST DATE,
	MN_CASE_COUNT INT,
	MN_HOSPITALIZED_COUNT INT,
	MN_DEATH_COUNT INT,
	QN_CASE_COUNT INT,
	QN_HOSPITALIZED_COUNT INT,
	QN_DEATH_COUNT INT,
	BK_CASE_COUNT INT,
	BK_HOSPITALIZED_COUNT INT,
	BK_DEATH_COUNT	INT,
	BX_CASE_COUNT	INT,
	BX_HOSPITALIZED_COUNT	INT,
	BX_DEATH_COUNT	INT,
	SI_CASE_COUNT INT,
	SI_HOSPITALIZED_COUNT INT, 
	SI_DEATH_COUNT INT);
	
select * from covid_data;	


alter table covid_data
rename column 	DATE_OF_INTEREST to date; 

alter table covid_data
rename column MN_CASE_COUNT to manhattan_cases;

alter table covid_data
rename column MN_HOSPITALIZED_COUNT to manhattan_hospitalizations;

alter table covid_data
rename column MN_DEATH_COUNT to manhattan_deaths;

alter table covid_data
rename column QN_CASE_COUNT to queens_cases;


alter table covid_data
rename column QN_HOSPITALIZED_COUNT to queens_hospitalizations;

alter table covid_data
rename column QN_DEATH_COUNT to queens_deaths;

alter table covid_data
rename column BK_CASE_COUNT to brooklyn_cases;

alter table covid_data
rename column BK_HOSPITALIZED_COUNT to brooklyn_hospitalizations;

alter table covid_data
rename column BK_DEATH_COUNT to brooklyn_deaths;

alter table covid_data
rename column BX_CASE_COUNT	to bronx_cases;

alter table covid_data
rename column BX_HOSPITALIZED_COUNT	to bronx_hospitalizations;

alter table covid_data
rename column BX_DEATH_COUNT to bronx_deaths;

alter table covid_data
rename column SI_CASE_COUNT to staten_island_cases;

alter table covid_data
rename column SI_HOSPITALIZED_COUNT to staten_island_hospitalizations;

alter table covid_data
rename column SI_DEATH_COUNT to staten_island_deaths


	



