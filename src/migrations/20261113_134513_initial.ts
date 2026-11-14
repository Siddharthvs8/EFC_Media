import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_links_link_appearance" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum_pages_blocks_hero_style" AS ENUM('statement', 'page');
  CREATE TYPE "public"."enum_pages_blocks_hero_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_marquee_tone" AS ENUM('brand', 'ink', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_statement_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_statement_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_services_list_source" AS ENUM('all', 'selected');
  CREATE TYPE "public"."enum_pages_blocks_services_list_detail" AS ENUM('rows', 'detailed');
  CREATE TYPE "public"."enum_pages_blocks_services_list_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_services_list_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_work_grid_source" AS ENUM('featured', 'latest', 'all', 'selected');
  CREATE TYPE "public"."enum_pages_blocks_work_grid_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_work_grid_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_approach_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_stats_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_source" AS ENUM('all', 'selected');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_team_source" AS ENUM('all', 'selected');
  CREATE TYPE "public"."enum_pages_blocks_team_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_posts_grid_source" AS ENUM('latest', 'all');
  CREATE TYPE "public"."enum_pages_blocks_posts_grid_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_posts_grid_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_faq_source" AS ENUM('all', 'selected');
  CREATE TYPE "public"."enum_pages_blocks_faq_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_appearance" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum_pages_blocks_cta_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_content_layout" AS ENUM('split', 'single');
  CREATE TYPE "public"."enum_pages_blocks_content_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_media_text_media_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_pages_blocks_media_text_media_style" AS ENUM('cover', 'plate');
  CREATE TYPE "public"."enum_pages_blocks_media_text_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_media_text_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_media_block_size" AS ENUM('contained', 'wide', 'full');
  CREATE TYPE "public"."enum_pages_blocks_media_block_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_form_block_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_links_link_appearance" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_style" AS ENUM('statement', 'page');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_marquee_tone" AS ENUM('brand', 'ink', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_statement_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_statement_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_services_list_source" AS ENUM('all', 'selected');
  CREATE TYPE "public"."enum__pages_v_blocks_services_list_detail" AS ENUM('rows', 'detailed');
  CREATE TYPE "public"."enum__pages_v_blocks_services_list_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_services_list_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_work_grid_source" AS ENUM('featured', 'latest', 'all', 'selected');
  CREATE TYPE "public"."enum__pages_v_blocks_work_grid_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_work_grid_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_approach_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_source" AS ENUM('all', 'selected');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_team_source" AS ENUM('all', 'selected');
  CREATE TYPE "public"."enum__pages_v_blocks_team_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_posts_grid_source" AS ENUM('latest', 'all');
  CREATE TYPE "public"."enum__pages_v_blocks_posts_grid_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_posts_grid_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_source" AS ENUM('all', 'selected');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_content_layout" AS ENUM('split', 'single');
  CREATE TYPE "public"."enum__pages_v_blocks_content_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_media_text_media_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum__pages_v_blocks_media_text_media_style" AS ENUM('cover', 'plate');
  CREATE TYPE "public"."enum__pages_v_blocks_media_text_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_media_text_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_size" AS ENUM('contained', 'wide', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_form_block_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_services_blocks_statement_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_services_blocks_statement_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_services_blocks_approach_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_services_blocks_stats_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_services_blocks_testimonials_source" AS ENUM('all', 'selected');
  CREATE TYPE "public"."enum_services_blocks_testimonials_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_services_blocks_faq_source" AS ENUM('all', 'selected');
  CREATE TYPE "public"."enum_services_blocks_faq_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_services_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_services_blocks_cta_links_link_appearance" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum_services_blocks_cta_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_services_blocks_content_layout" AS ENUM('split', 'single');
  CREATE TYPE "public"."enum_services_blocks_content_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_services_blocks_media_text_media_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_services_blocks_media_text_media_style" AS ENUM('cover', 'plate');
  CREATE TYPE "public"."enum_services_blocks_media_text_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_services_blocks_media_text_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_services_blocks_media_block_size" AS ENUM('contained', 'wide', 'full');
  CREATE TYPE "public"."enum_services_blocks_media_block_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_services_blocks_feature_grid_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_services_blocks_work_grid_source" AS ENUM('featured', 'latest', 'all', 'selected');
  CREATE TYPE "public"."enum_services_blocks_work_grid_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_services_blocks_work_grid_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_services_blocks_form_block_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_services_icon" AS ENUM('spark', 'megaphone', 'play', 'target', 'search', 'code', 'chart', 'layers');
  CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_blocks_statement_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__services_v_blocks_statement_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_approach_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_stats_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_testimonials_source" AS ENUM('all', 'selected');
  CREATE TYPE "public"."enum__services_v_blocks_testimonials_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_faq_source" AS ENUM('all', 'selected');
  CREATE TYPE "public"."enum__services_v_blocks_faq_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__services_v_blocks_cta_links_link_appearance" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum__services_v_blocks_cta_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_content_layout" AS ENUM('split', 'single');
  CREATE TYPE "public"."enum__services_v_blocks_content_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_media_text_media_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum__services_v_blocks_media_text_media_style" AS ENUM('cover', 'plate');
  CREATE TYPE "public"."enum__services_v_blocks_media_text_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__services_v_blocks_media_text_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_media_block_size" AS ENUM('contained', 'wide', 'full');
  CREATE TYPE "public"."enum__services_v_blocks_media_block_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_feature_grid_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_work_grid_source" AS ENUM('featured', 'latest', 'all', 'selected');
  CREATE TYPE "public"."enum__services_v_blocks_work_grid_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__services_v_blocks_work_grid_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__services_v_blocks_form_block_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__services_v_version_icon" AS ENUM('spark', 'megaphone', 'play', 'target', 'search', 'code', 'chart', 'layers');
  CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_case_studies_blocks_statement_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_case_studies_blocks_statement_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_case_studies_blocks_approach_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_case_studies_blocks_stats_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_case_studies_blocks_testimonials_source" AS ENUM('all', 'selected');
  CREATE TYPE "public"."enum_case_studies_blocks_testimonials_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_case_studies_blocks_faq_source" AS ENUM('all', 'selected');
  CREATE TYPE "public"."enum_case_studies_blocks_faq_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_case_studies_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_case_studies_blocks_cta_links_link_appearance" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum_case_studies_blocks_cta_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_case_studies_blocks_content_layout" AS ENUM('split', 'single');
  CREATE TYPE "public"."enum_case_studies_blocks_content_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_case_studies_blocks_media_text_media_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_case_studies_blocks_media_text_media_style" AS ENUM('cover', 'plate');
  CREATE TYPE "public"."enum_case_studies_blocks_media_text_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_case_studies_blocks_media_text_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_case_studies_blocks_media_block_size" AS ENUM('contained', 'wide', 'full');
  CREATE TYPE "public"."enum_case_studies_blocks_media_block_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_case_studies_blocks_feature_grid_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_case_studies_blocks_work_grid_source" AS ENUM('featured', 'latest', 'all', 'selected');
  CREATE TYPE "public"."enum_case_studies_blocks_work_grid_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_case_studies_blocks_work_grid_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_case_studies_blocks_form_block_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum_case_studies_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__case_studies_v_blocks_statement_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__case_studies_v_blocks_statement_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__case_studies_v_blocks_approach_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__case_studies_v_blocks_stats_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__case_studies_v_blocks_testimonials_source" AS ENUM('all', 'selected');
  CREATE TYPE "public"."enum__case_studies_v_blocks_testimonials_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__case_studies_v_blocks_faq_source" AS ENUM('all', 'selected');
  CREATE TYPE "public"."enum__case_studies_v_blocks_faq_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__case_studies_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__case_studies_v_blocks_cta_links_link_appearance" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum__case_studies_v_blocks_cta_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__case_studies_v_blocks_content_layout" AS ENUM('split', 'single');
  CREATE TYPE "public"."enum__case_studies_v_blocks_content_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__case_studies_v_blocks_media_text_media_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum__case_studies_v_blocks_media_text_media_style" AS ENUM('cover', 'plate');
  CREATE TYPE "public"."enum__case_studies_v_blocks_media_text_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__case_studies_v_blocks_media_text_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__case_studies_v_blocks_media_block_size" AS ENUM('contained', 'wide', 'full');
  CREATE TYPE "public"."enum__case_studies_v_blocks_media_block_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__case_studies_v_blocks_feature_grid_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__case_studies_v_blocks_work_grid_source" AS ENUM('featured', 'latest', 'all', 'selected');
  CREATE TYPE "public"."enum__case_studies_v_blocks_work_grid_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__case_studies_v_blocks_work_grid_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__case_studies_v_blocks_form_block_theme" AS ENUM('light', 'tint', 'dark');
  CREATE TYPE "public"."enum__case_studies_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'author');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_form_submissions_status" AS ENUM('new', 'in-progress', 'done', 'spam');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('media');
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_cta_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__header_v_version_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__header_v_version_cta_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_columns_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_legal_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__footer_v_version_columns_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__footer_v_version_legal_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_settings_social_platform" AS ENUM('instagram', 'facebook', 'linkedin', 'youtube', 'x', 'whatsapp', 'threads', 'behance');
  CREATE TYPE "public"."enum__settings_v_version_social_platform" AS ENUM('instagram', 'facebook', 'linkedin', 'youtube', 'x', 'whatsapp', 'threads', 'behance');
  CREATE TABLE "pages_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_hero_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_hero_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_pages_blocks_hero_style" DEFAULT 'page',
  	"eyebrow" varchar,
  	"headline" varchar,
  	"intro" varchar,
  	"orbit_text" varchar,
  	"media_id" integer,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_pages_blocks_hero_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_marquee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "enum_pages_blocks_marquee_tone" DEFAULT 'brand',
  	"is_hidden" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_statement_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"text" varchar,
  	"link_type" "enum_pages_blocks_statement_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_pages_blocks_statement_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum_pages_blocks_services_list_source" DEFAULT 'all',
  	"detail" "enum_pages_blocks_services_list_detail" DEFAULT 'rows',
  	"link_type" "enum_pages_blocks_services_list_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_pages_blocks_services_list_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_work_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum_pages_blocks_work_grid_source" DEFAULT 'featured',
  	"limit" numeric DEFAULT 3,
  	"link_type" "enum_pages_blocks_work_grid_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_pages_blocks_work_grid_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_approach_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"keywords" varchar
  );
  
  CREATE TABLE "pages_blocks_approach" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_pages_blocks_approach_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"placeholder" boolean DEFAULT false,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_pages_blocks_stats_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum_pages_blocks_testimonials_source" DEFAULT 'all',
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_pages_blocks_testimonials_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum_pages_blocks_team_source" DEFAULT 'all',
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_pages_blocks_team_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_posts_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum_pages_blocks_posts_grid_source" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"link_type" "enum_pages_blocks_posts_grid_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_pages_blocks_posts_grid_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum_pages_blocks_faq_source" DEFAULT 'all',
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_pages_blocks_faq_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_cta_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"show_contact" boolean DEFAULT true,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_pages_blocks_cta_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"rich_text" jsonb,
  	"layout" "enum_pages_blocks_content_layout" DEFAULT 'split',
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_pages_blocks_content_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"rich_text" jsonb,
  	"media_id" integer,
  	"media_position" "enum_pages_blocks_media_text_media_position" DEFAULT 'right',
  	"media_style" "enum_pages_blocks_media_text_media_style" DEFAULT 'cover',
  	"link_type" "enum_pages_blocks_media_text_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_pages_blocks_media_text_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"size" "enum_pages_blocks_media_block_size" DEFAULT 'wide',
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_pages_blocks_media_block_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_pages_blocks_feature_grid_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"form_id" integer,
  	"show_contact_details" boolean DEFAULT true,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_pages_blocks_form_block_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"case_studies_id" integer,
  	"posts_id" integer,
  	"testimonials_id" integer,
  	"team_id" integer,
  	"faqs_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_hero_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "enum__pages_v_blocks_hero_style" DEFAULT 'page',
  	"eyebrow" varchar,
  	"headline" varchar,
  	"intro" varchar,
  	"orbit_text" varchar,
  	"media_id" integer,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__pages_v_blocks_hero_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_marquee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tone" "enum__pages_v_blocks_marquee_tone" DEFAULT 'brand',
  	"is_hidden" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_statement_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"text" varchar,
  	"link_type" "enum__pages_v_blocks_statement_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__pages_v_blocks_statement_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum__pages_v_blocks_services_list_source" DEFAULT 'all',
  	"detail" "enum__pages_v_blocks_services_list_detail" DEFAULT 'rows',
  	"link_type" "enum__pages_v_blocks_services_list_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__pages_v_blocks_services_list_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_work_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum__pages_v_blocks_work_grid_source" DEFAULT 'featured',
  	"limit" numeric DEFAULT 3,
  	"link_type" "enum__pages_v_blocks_work_grid_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__pages_v_blocks_work_grid_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_approach_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"keywords" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_approach" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__pages_v_blocks_approach_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"placeholder" boolean DEFAULT false,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__pages_v_blocks_stats_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum__pages_v_blocks_testimonials_source" DEFAULT 'all',
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__pages_v_blocks_testimonials_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum__pages_v_blocks_team_source" DEFAULT 'all',
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__pages_v_blocks_team_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_posts_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum__pages_v_blocks_posts_grid_source" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"link_type" "enum__pages_v_blocks_posts_grid_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__pages_v_blocks_posts_grid_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum__pages_v_blocks_faq_source" DEFAULT 'all',
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__pages_v_blocks_faq_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_cta_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"show_contact" boolean DEFAULT true,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__pages_v_blocks_cta_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"rich_text" jsonb,
  	"layout" "enum__pages_v_blocks_content_layout" DEFAULT 'split',
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__pages_v_blocks_content_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"rich_text" jsonb,
  	"media_id" integer,
  	"media_position" "enum__pages_v_blocks_media_text_media_position" DEFAULT 'right',
  	"media_style" "enum__pages_v_blocks_media_text_media_style" DEFAULT 'cover',
  	"link_type" "enum__pages_v_blocks_media_text_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__pages_v_blocks_media_text_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"size" "enum__pages_v_blocks_media_block_size" DEFAULT 'wide',
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__pages_v_blocks_media_block_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__pages_v_blocks_feature_grid_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"form_id" integer,
  	"show_contact_details" boolean DEFAULT true,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__pages_v_blocks_form_block_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"case_studies_id" integer,
  	"posts_id" integer,
  	"testimonials_id" integer,
  	"team_id" integer,
  	"faqs_id" integer
  );
  
  CREATE TABLE "services_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "services_blocks_statement_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "services_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"text" varchar,
  	"link_type" "enum_services_blocks_statement_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_services_blocks_statement_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_approach_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"keywords" varchar
  );
  
  CREATE TABLE "services_blocks_approach" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_services_blocks_approach_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "services_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"placeholder" boolean DEFAULT false,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_services_blocks_stats_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum_services_blocks_testimonials_source" DEFAULT 'all',
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_services_blocks_testimonials_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum_services_blocks_faq_source" DEFAULT 'all',
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_services_blocks_faq_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_services_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_services_blocks_cta_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "services_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"show_contact" boolean DEFAULT true,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_services_blocks_cta_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"rich_text" jsonb,
  	"layout" "enum_services_blocks_content_layout" DEFAULT 'split',
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_services_blocks_content_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_media_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"rich_text" jsonb,
  	"media_id" integer,
  	"media_position" "enum_services_blocks_media_text_media_position" DEFAULT 'right',
  	"media_style" "enum_services_blocks_media_text_media_style" DEFAULT 'cover',
  	"link_type" "enum_services_blocks_media_text_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_services_blocks_media_text_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"size" "enum_services_blocks_media_block_size" DEFAULT 'wide',
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_services_blocks_media_block_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "services_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_services_blocks_feature_grid_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_work_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum_services_blocks_work_grid_source" DEFAULT 'featured',
  	"limit" numeric DEFAULT 3,
  	"link_type" "enum_services_blocks_work_grid_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_services_blocks_work_grid_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"form_id" integer,
  	"show_contact_details" boolean DEFAULT true,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_services_blocks_form_block_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"title" varchar,
  	"summary" varchar,
  	"intro" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"icon" "enum_services_icon" DEFAULT 'spark',
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_services_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "services_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"case_studies_id" integer,
  	"posts_id" integer,
  	"testimonials_id" integer,
  	"faqs_id" integer
  );
  
  CREATE TABLE "_services_v_version_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_statement_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"text" varchar,
  	"link_type" "enum__services_v_blocks_statement_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__services_v_blocks_statement_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_approach_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"keywords" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_approach" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__services_v_blocks_approach_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"placeholder" boolean DEFAULT false,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__services_v_blocks_stats_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum__services_v_blocks_testimonials_source" DEFAULT 'all',
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__services_v_blocks_testimonials_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum__services_v_blocks_faq_source" DEFAULT 'all',
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__services_v_blocks_faq_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__services_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__services_v_blocks_cta_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"show_contact" boolean DEFAULT true,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__services_v_blocks_cta_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"rich_text" jsonb,
  	"layout" "enum__services_v_blocks_content_layout" DEFAULT 'split',
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__services_v_blocks_content_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_media_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"rich_text" jsonb,
  	"media_id" integer,
  	"media_position" "enum__services_v_blocks_media_text_media_position" DEFAULT 'right',
  	"media_style" "enum__services_v_blocks_media_text_media_style" DEFAULT 'cover',
  	"link_type" "enum__services_v_blocks_media_text_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__services_v_blocks_media_text_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"size" "enum__services_v_blocks_media_block_size" DEFAULT 'wide',
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__services_v_blocks_media_block_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__services_v_blocks_feature_grid_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_work_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum__services_v_blocks_work_grid_source" DEFAULT 'featured',
  	"limit" numeric DEFAULT 3,
  	"link_type" "enum__services_v_blocks_work_grid_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__services_v_blocks_work_grid_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"form_id" integer,
  	"show_contact_details" boolean DEFAULT true,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__services_v_blocks_form_block_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_intro" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_icon" "enum__services_v_version_icon" DEFAULT 'spark',
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_services_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"case_studies_id" integer,
  	"posts_id" integer,
  	"testimonials_id" integer,
  	"faqs_id" integer
  );
  
  CREATE TABLE "case_studies_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "case_studies_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "case_studies_blocks_statement_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "case_studies_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"text" varchar,
  	"link_type" "enum_case_studies_blocks_statement_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_case_studies_blocks_statement_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_blocks_approach_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"keywords" varchar
  );
  
  CREATE TABLE "case_studies_blocks_approach" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_case_studies_blocks_approach_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "case_studies_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"placeholder" boolean DEFAULT false,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_case_studies_blocks_stats_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum_case_studies_blocks_testimonials_source" DEFAULT 'all',
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_case_studies_blocks_testimonials_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum_case_studies_blocks_faq_source" DEFAULT 'all',
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_case_studies_blocks_faq_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_case_studies_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_case_studies_blocks_cta_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "case_studies_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"show_contact" boolean DEFAULT true,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_case_studies_blocks_cta_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"rich_text" jsonb,
  	"layout" "enum_case_studies_blocks_content_layout" DEFAULT 'split',
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_case_studies_blocks_content_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_blocks_media_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"rich_text" jsonb,
  	"media_id" integer,
  	"media_position" "enum_case_studies_blocks_media_text_media_position" DEFAULT 'right',
  	"media_style" "enum_case_studies_blocks_media_text_media_style" DEFAULT 'cover',
  	"link_type" "enum_case_studies_blocks_media_text_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_case_studies_blocks_media_text_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"size" "enum_case_studies_blocks_media_block_size" DEFAULT 'wide',
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_case_studies_blocks_media_block_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "case_studies_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_case_studies_blocks_feature_grid_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_blocks_work_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum_case_studies_blocks_work_grid_source" DEFAULT 'featured',
  	"limit" numeric DEFAULT 3,
  	"link_type" "enum_case_studies_blocks_work_grid_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_case_studies_blocks_work_grid_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"form_id" integer,
  	"show_contact_details" boolean DEFAULT true,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum_case_studies_blocks_form_block_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"summary" varchar,
  	"client" varchar,
  	"industry" varchar,
  	"year" varchar,
  	"cover_image_id" integer,
  	"challenge" jsonb,
  	"approach" jsonb,
  	"outcome" jsonb,
  	"testimonial_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"featured" boolean DEFAULT false,
  	"placeholder" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_case_studies_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "case_studies_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"pages_id" integer,
  	"case_studies_id" integer,
  	"posts_id" integer,
  	"testimonials_id" integer,
  	"faqs_id" integer
  );
  
  CREATE TABLE "_case_studies_v_version_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_studies_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_studies_v_blocks_statement_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_studies_v_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"text" varchar,
  	"link_type" "enum__case_studies_v_blocks_statement_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__case_studies_v_blocks_statement_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_case_studies_v_blocks_approach_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"keywords" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_studies_v_blocks_approach" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__case_studies_v_blocks_approach_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_case_studies_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_studies_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"placeholder" boolean DEFAULT false,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__case_studies_v_blocks_stats_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_case_studies_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum__case_studies_v_blocks_testimonials_source" DEFAULT 'all',
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__case_studies_v_blocks_testimonials_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_case_studies_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum__case_studies_v_blocks_faq_source" DEFAULT 'all',
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__case_studies_v_blocks_faq_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_case_studies_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__case_studies_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__case_studies_v_blocks_cta_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_studies_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"show_contact" boolean DEFAULT true,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__case_studies_v_blocks_cta_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_case_studies_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"rich_text" jsonb,
  	"layout" "enum__case_studies_v_blocks_content_layout" DEFAULT 'split',
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__case_studies_v_blocks_content_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_case_studies_v_blocks_media_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"rich_text" jsonb,
  	"media_id" integer,
  	"media_position" "enum__case_studies_v_blocks_media_text_media_position" DEFAULT 'right',
  	"media_style" "enum__case_studies_v_blocks_media_text_media_style" DEFAULT 'cover',
  	"link_type" "enum__case_studies_v_blocks_media_text_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__case_studies_v_blocks_media_text_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_case_studies_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"size" "enum__case_studies_v_blocks_media_block_size" DEFAULT 'wide',
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__case_studies_v_blocks_media_block_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_case_studies_v_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_studies_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__case_studies_v_blocks_feature_grid_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_case_studies_v_blocks_work_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum__case_studies_v_blocks_work_grid_source" DEFAULT 'featured',
  	"limit" numeric DEFAULT 3,
  	"link_type" "enum__case_studies_v_blocks_work_grid_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__case_studies_v_blocks_work_grid_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_case_studies_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"form_id" integer,
  	"show_contact_details" boolean DEFAULT true,
  	"is_hidden" boolean DEFAULT false,
  	"theme" "enum__case_studies_v_blocks_form_block_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_case_studies_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_client" varchar,
  	"version_industry" varchar,
  	"version_year" varchar,
  	"version_cover_image_id" integer,
  	"version_challenge" jsonb,
  	"version_approach" jsonb,
  	"version_outcome" jsonb,
  	"version_testimonial_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_featured" boolean DEFAULT false,
  	"version_placeholder" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__case_studies_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_case_studies_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"pages_id" integer,
  	"case_studies_id" integer,
  	"posts_id" integer,
  	"testimonials_id" integer,
  	"faqs_id" integer
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"excerpt" varchar,
  	"cover_image_id" integer,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"author_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"created_by_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_cover_image_id" integer,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_author_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_created_by_id" integer,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"quote" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar,
  	"company" varchar,
  	"avatar_id" integer,
  	"placeholder" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "team" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"role" varchar,
  	"bio" varchar,
  	"photo_id" integer,
  	"linkedin" varchar,
  	"instagram" varchar,
  	"placeholder" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"prefix" varchar DEFAULT '',
  	"_objectkey" varchar,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"placeholder" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar,
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"submit_button_label" varchar,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"confirmation_message" jsonb,
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"submitter_name" varchar,
  	"submitter_email" varchar,
  	"status" "enum_form_submissions_status" DEFAULT 'new',
  	"form_id" integer NOT NULL,
  	"source_path" varchar,
  	"ip_hash" varchar,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_folders_folder_type" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_payload_folders_folder_type",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload_folders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"case_studies_id" integer,
  	"posts_id" integer,
  	"categories_id" integer,
  	"testimonials_id" integer,
  	"team_id" integer,
  	"faqs_id" integer,
  	"media_id" integer,
  	"users_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer,
  	"payload_folders_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_type" "enum_header_cta_type" DEFAULT 'reference',
  	"cta_new_tab" boolean,
  	"cta_url" varchar,
  	"cta_label" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"case_studies_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "_header_v_version_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__header_v_version_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_header_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_cta_type" "enum__header_v_version_cta_type" DEFAULT 'reference',
  	"version_cta_new_tab" boolean,
  	"version_cta_url" varchar,
  	"version_cta_label" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_header_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"case_studies_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_columns_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_legal_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"statement" varchar,
  	"note" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"case_studies_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "_footer_v_version_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__footer_v_version_columns_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v_version_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v_version_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__footer_v_version_legal_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_statement" varchar,
  	"version_note" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_footer_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"case_studies_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "settings_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_settings_social_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'EFC Media' NOT NULL,
  	"tagline" varchar DEFAULT 'Your Growth Partner.',
  	"logo_id" integer,
  	"logo_mark_id" integer,
  	"favicon_id" integer,
  	"email" varchar,
  	"phone" varchar,
  	"whatsapp" varchar,
  	"address" varchar,
  	"city" varchar,
  	"region" varchar,
  	"country" varchar,
  	"hours" varchar,
  	"map_url" varchar,
  	"seo_title_suffix" varchar DEFAULT 'EFC Media',
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"labels_service_overview" varchar DEFAULT 'Overview',
  	"labels_service_included" varchar DEFAULT 'What’s included',
  	"labels_service_related_work" varchar DEFAULT 'Related work',
  	"labels_service_next" varchar DEFAULT 'Next service',
  	"labels_services_all" varchar DEFAULT 'All services',
  	"labels_case_study_eyebrow" varchar DEFAULT 'Case study',
  	"labels_case_study_client" varchar DEFAULT 'Client',
  	"labels_case_study_industry" varchar DEFAULT 'Industry',
  	"labels_case_study_services" varchar DEFAULT 'Services',
  	"labels_case_study_year" varchar DEFAULT 'Year',
  	"labels_case_study_challenge" varchar DEFAULT 'The challenge',
  	"labels_case_study_approach" varchar DEFAULT 'What we did',
  	"labels_case_study_outcome" varchar DEFAULT 'The outcome',
  	"labels_case_study_results" varchar DEFAULT 'Results',
  	"labels_case_study_next" varchar DEFAULT 'Next project',
  	"labels_work_all" varchar DEFAULT 'All work',
  	"labels_article_by" varchar DEFAULT 'Written by',
  	"labels_article_team" varchar DEFAULT 'The EFC Media team',
  	"labels_article_reading_time" varchar DEFAULT 'min read',
  	"labels_article_more" varchar DEFAULT 'Keep reading',
  	"labels_insights_all" varchar DEFAULT 'All insights',
  	"labels_not_found_title" varchar DEFAULT 'This page took a *wrong turn.*',
  	"labels_not_found_text" varchar DEFAULT 'The page you’re looking for has moved or never existed. Let’s get you back on track.',
  	"labels_not_found_button" varchar DEFAULT 'Back to home',
  	"launch_allow_indexing" boolean DEFAULT false,
  	"launch_hide_placeholders" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_settings_v_version_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "enum__settings_v_version_social_platform" NOT NULL,
  	"url" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_site_name" varchar DEFAULT 'EFC Media' NOT NULL,
  	"version_tagline" varchar DEFAULT 'Your Growth Partner.',
  	"version_logo_id" integer,
  	"version_logo_mark_id" integer,
  	"version_favicon_id" integer,
  	"version_email" varchar,
  	"version_phone" varchar,
  	"version_whatsapp" varchar,
  	"version_address" varchar,
  	"version_city" varchar,
  	"version_region" varchar,
  	"version_country" varchar,
  	"version_hours" varchar,
  	"version_map_url" varchar,
  	"version_seo_title_suffix" varchar DEFAULT 'EFC Media',
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_labels_service_overview" varchar DEFAULT 'Overview',
  	"version_labels_service_included" varchar DEFAULT 'What’s included',
  	"version_labels_service_related_work" varchar DEFAULT 'Related work',
  	"version_labels_service_next" varchar DEFAULT 'Next service',
  	"version_labels_services_all" varchar DEFAULT 'All services',
  	"version_labels_case_study_eyebrow" varchar DEFAULT 'Case study',
  	"version_labels_case_study_client" varchar DEFAULT 'Client',
  	"version_labels_case_study_industry" varchar DEFAULT 'Industry',
  	"version_labels_case_study_services" varchar DEFAULT 'Services',
  	"version_labels_case_study_year" varchar DEFAULT 'Year',
  	"version_labels_case_study_challenge" varchar DEFAULT 'The challenge',
  	"version_labels_case_study_approach" varchar DEFAULT 'What we did',
  	"version_labels_case_study_outcome" varchar DEFAULT 'The outcome',
  	"version_labels_case_study_results" varchar DEFAULT 'Results',
  	"version_labels_case_study_next" varchar DEFAULT 'Next project',
  	"version_labels_work_all" varchar DEFAULT 'All work',
  	"version_labels_article_by" varchar DEFAULT 'Written by',
  	"version_labels_article_team" varchar DEFAULT 'The EFC Media team',
  	"version_labels_article_reading_time" varchar DEFAULT 'min read',
  	"version_labels_article_more" varchar DEFAULT 'Keep reading',
  	"version_labels_insights_all" varchar DEFAULT 'All insights',
  	"version_labels_not_found_title" varchar DEFAULT 'This page took a *wrong turn.*',
  	"version_labels_not_found_text" varchar DEFAULT 'The page you’re looking for has moved or never existed. Let’s get you back on track.',
  	"version_labels_not_found_button" varchar DEFAULT 'Back to home',
  	"version_launch_allow_indexing" boolean DEFAULT false,
  	"version_launch_hide_placeholders" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "pages_blocks_hero_links" ADD CONSTRAINT "pages_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_pillars" ADD CONSTRAINT "pages_blocks_hero_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_marquee_items" ADD CONSTRAINT "pages_blocks_marquee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_marquee"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_marquee" ADD CONSTRAINT "pages_blocks_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_statement_columns" ADD CONSTRAINT "pages_blocks_statement_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_statement" ADD CONSTRAINT "pages_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_list" ADD CONSTRAINT "pages_blocks_services_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_work_grid" ADD CONSTRAINT "pages_blocks_work_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_approach_steps" ADD CONSTRAINT "pages_blocks_approach_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_approach"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_approach" ADD CONSTRAINT "pages_blocks_approach_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items" ADD CONSTRAINT "pages_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team" ADD CONSTRAINT "pages_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_posts_grid" ADD CONSTRAINT "pages_blocks_posts_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content" ADD CONSTRAINT "pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_text" ADD CONSTRAINT "pages_blocks_media_text_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_text" ADD CONSTRAINT "pages_blocks_media_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_items" ADD CONSTRAINT "pages_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid" ADD CONSTRAINT "pages_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_links" ADD CONSTRAINT "_pages_v_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_pillars" ADD CONSTRAINT "_pages_v_blocks_hero_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_marquee_items" ADD CONSTRAINT "_pages_v_blocks_marquee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_marquee"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_marquee" ADD CONSTRAINT "_pages_v_blocks_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statement_columns" ADD CONSTRAINT "_pages_v_blocks_statement_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statement" ADD CONSTRAINT "_pages_v_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_list" ADD CONSTRAINT "_pages_v_blocks_services_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_work_grid" ADD CONSTRAINT "_pages_v_blocks_work_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_approach_steps" ADD CONSTRAINT "_pages_v_blocks_approach_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_approach"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_approach" ADD CONSTRAINT "_pages_v_blocks_approach_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_items" ADD CONSTRAINT "_pages_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team" ADD CONSTRAINT "_pages_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_posts_grid" ADD CONSTRAINT "_pages_v_blocks_posts_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD CONSTRAINT "_pages_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content" ADD CONSTRAINT "_pages_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_text" ADD CONSTRAINT "_pages_v_blocks_media_text_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_text" ADD CONSTRAINT "_pages_v_blocks_media_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid_items" ADD CONSTRAINT "_pages_v_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid" ADD CONSTRAINT "_pages_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_deliverables" ADD CONSTRAINT "services_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_statement_columns" ADD CONSTRAINT "services_blocks_statement_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_statement" ADD CONSTRAINT "services_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_approach_steps" ADD CONSTRAINT "services_blocks_approach_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_approach"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_approach" ADD CONSTRAINT "services_blocks_approach_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_stats_items" ADD CONSTRAINT "services_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_stats" ADD CONSTRAINT "services_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_testimonials" ADD CONSTRAINT "services_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq" ADD CONSTRAINT "services_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cta_links" ADD CONSTRAINT "services_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cta" ADD CONSTRAINT "services_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_content" ADD CONSTRAINT "services_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_media_text" ADD CONSTRAINT "services_blocks_media_text_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_media_text" ADD CONSTRAINT "services_blocks_media_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_media_block" ADD CONSTRAINT "services_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_media_block" ADD CONSTRAINT "services_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_feature_grid_items" ADD CONSTRAINT "services_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_feature_grid" ADD CONSTRAINT "services_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_work_grid" ADD CONSTRAINT "services_blocks_work_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_form_block" ADD CONSTRAINT "services_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_form_block" ADD CONSTRAINT "services_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_deliverables" ADD CONSTRAINT "_services_v_version_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_statement_columns" ADD CONSTRAINT "_services_v_blocks_statement_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_statement" ADD CONSTRAINT "_services_v_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_approach_steps" ADD CONSTRAINT "_services_v_blocks_approach_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_approach"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_approach" ADD CONSTRAINT "_services_v_blocks_approach_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_stats_items" ADD CONSTRAINT "_services_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_stats" ADD CONSTRAINT "_services_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_testimonials" ADD CONSTRAINT "_services_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_faq" ADD CONSTRAINT "_services_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_cta_links" ADD CONSTRAINT "_services_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_cta" ADD CONSTRAINT "_services_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_content" ADD CONSTRAINT "_services_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_media_text" ADD CONSTRAINT "_services_v_blocks_media_text_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_media_text" ADD CONSTRAINT "_services_v_blocks_media_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_media_block" ADD CONSTRAINT "_services_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_media_block" ADD CONSTRAINT "_services_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_feature_grid_items" ADD CONSTRAINT "_services_v_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_feature_grid" ADD CONSTRAINT "_services_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_work_grid" ADD CONSTRAINT "_services_v_blocks_work_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_form_block" ADD CONSTRAINT "_services_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_form_block" ADD CONSTRAINT "_services_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_results" ADD CONSTRAINT "case_studies_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_gallery" ADD CONSTRAINT "case_studies_gallery_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_gallery" ADD CONSTRAINT "case_studies_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_statement_columns" ADD CONSTRAINT "case_studies_blocks_statement_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_blocks_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_statement" ADD CONSTRAINT "case_studies_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_approach_steps" ADD CONSTRAINT "case_studies_blocks_approach_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_blocks_approach"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_approach" ADD CONSTRAINT "case_studies_blocks_approach_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_stats_items" ADD CONSTRAINT "case_studies_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_stats" ADD CONSTRAINT "case_studies_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_testimonials" ADD CONSTRAINT "case_studies_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_faq" ADD CONSTRAINT "case_studies_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_cta_links" ADD CONSTRAINT "case_studies_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_cta" ADD CONSTRAINT "case_studies_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_content" ADD CONSTRAINT "case_studies_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_media_text" ADD CONSTRAINT "case_studies_blocks_media_text_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_media_text" ADD CONSTRAINT "case_studies_blocks_media_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_media_block" ADD CONSTRAINT "case_studies_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_media_block" ADD CONSTRAINT "case_studies_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_feature_grid_items" ADD CONSTRAINT "case_studies_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_feature_grid" ADD CONSTRAINT "case_studies_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_work_grid" ADD CONSTRAINT "case_studies_blocks_work_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_form_block" ADD CONSTRAINT "case_studies_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_form_block" ADD CONSTRAINT "case_studies_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_version_results" ADD CONSTRAINT "_case_studies_v_version_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_version_gallery" ADD CONSTRAINT "_case_studies_v_version_gallery_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v_version_gallery" ADD CONSTRAINT "_case_studies_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_blocks_statement_columns" ADD CONSTRAINT "_case_studies_v_blocks_statement_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v_blocks_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_blocks_statement" ADD CONSTRAINT "_case_studies_v_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_blocks_approach_steps" ADD CONSTRAINT "_case_studies_v_blocks_approach_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v_blocks_approach"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_blocks_approach" ADD CONSTRAINT "_case_studies_v_blocks_approach_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_blocks_stats_items" ADD CONSTRAINT "_case_studies_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_blocks_stats" ADD CONSTRAINT "_case_studies_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_blocks_testimonials" ADD CONSTRAINT "_case_studies_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_blocks_faq" ADD CONSTRAINT "_case_studies_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_blocks_cta_links" ADD CONSTRAINT "_case_studies_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_blocks_cta" ADD CONSTRAINT "_case_studies_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_blocks_content" ADD CONSTRAINT "_case_studies_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_blocks_media_text" ADD CONSTRAINT "_case_studies_v_blocks_media_text_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v_blocks_media_text" ADD CONSTRAINT "_case_studies_v_blocks_media_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_blocks_media_block" ADD CONSTRAINT "_case_studies_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v_blocks_media_block" ADD CONSTRAINT "_case_studies_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_blocks_feature_grid_items" ADD CONSTRAINT "_case_studies_v_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_blocks_feature_grid" ADD CONSTRAINT "_case_studies_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_blocks_work_grid" ADD CONSTRAINT "_case_studies_v_blocks_work_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_blocks_form_block" ADD CONSTRAINT "_case_studies_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v_blocks_form_block" ADD CONSTRAINT "_case_studies_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_parent_id_case_studies_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."case_studies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_testimonial_id_testimonials_id_fk" FOREIGN KEY ("version_testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_team_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."team"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_author_id_team_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."team"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team" ADD CONSTRAINT "team_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders_folder_type" ADD CONSTRAINT "payload_folders_folder_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_version_nav_items" ADD CONSTRAINT "_header_v_version_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_header_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_rels" ADD CONSTRAINT "_header_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_header_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_rels" ADD CONSTRAINT "_header_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_rels" ADD CONSTRAINT "_header_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_rels" ADD CONSTRAINT "_header_v_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_rels" ADD CONSTRAINT "_header_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_columns_links" ADD CONSTRAINT "_footer_v_version_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v_version_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_columns" ADD CONSTRAINT "_footer_v_version_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_legal_links" ADD CONSTRAINT "_footer_v_version_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_rels" ADD CONSTRAINT "_footer_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_rels" ADD CONSTRAINT "_footer_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_rels" ADD CONSTRAINT "_footer_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_rels" ADD CONSTRAINT "_footer_v_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_rels" ADD CONSTRAINT "_footer_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_social" ADD CONSTRAINT "settings_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_logo_mark_id_media_id_fk" FOREIGN KEY ("logo_mark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_settings_v_version_social" ADD CONSTRAINT "_settings_v_version_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_settings_v" ADD CONSTRAINT "_settings_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_settings_v" ADD CONSTRAINT "_settings_v_version_logo_mark_id_media_id_fk" FOREIGN KEY ("version_logo_mark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_settings_v" ADD CONSTRAINT "_settings_v_version_favicon_id_media_id_fk" FOREIGN KEY ("version_favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_settings_v" ADD CONSTRAINT "_settings_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_links_order_idx" ON "pages_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_links_parent_id_idx" ON "pages_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_pillars_order_idx" ON "pages_blocks_hero_pillars" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_pillars_parent_id_idx" ON "pages_blocks_hero_pillars" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_media_idx" ON "pages_blocks_hero" USING btree ("media_id");
  CREATE INDEX "pages_blocks_marquee_items_order_idx" ON "pages_blocks_marquee_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_marquee_items_parent_id_idx" ON "pages_blocks_marquee_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_marquee_order_idx" ON "pages_blocks_marquee" USING btree ("_order");
  CREATE INDEX "pages_blocks_marquee_parent_id_idx" ON "pages_blocks_marquee" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_marquee_path_idx" ON "pages_blocks_marquee" USING btree ("_path");
  CREATE INDEX "pages_blocks_statement_columns_order_idx" ON "pages_blocks_statement_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_statement_columns_parent_id_idx" ON "pages_blocks_statement_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_statement_order_idx" ON "pages_blocks_statement" USING btree ("_order");
  CREATE INDEX "pages_blocks_statement_parent_id_idx" ON "pages_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_statement_path_idx" ON "pages_blocks_statement" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_list_order_idx" ON "pages_blocks_services_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_list_parent_id_idx" ON "pages_blocks_services_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_list_path_idx" ON "pages_blocks_services_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_work_grid_order_idx" ON "pages_blocks_work_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_work_grid_parent_id_idx" ON "pages_blocks_work_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_work_grid_path_idx" ON "pages_blocks_work_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_approach_steps_order_idx" ON "pages_blocks_approach_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_approach_steps_parent_id_idx" ON "pages_blocks_approach_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_approach_order_idx" ON "pages_blocks_approach" USING btree ("_order");
  CREATE INDEX "pages_blocks_approach_parent_id_idx" ON "pages_blocks_approach" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_approach_path_idx" ON "pages_blocks_approach" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_items_order_idx" ON "pages_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_items_parent_id_idx" ON "pages_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_team_order_idx" ON "pages_blocks_team" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_parent_id_idx" ON "pages_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_path_idx" ON "pages_blocks_team" USING btree ("_path");
  CREATE INDEX "pages_blocks_posts_grid_order_idx" ON "pages_blocks_posts_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_posts_grid_parent_id_idx" ON "pages_blocks_posts_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_posts_grid_path_idx" ON "pages_blocks_posts_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_links_order_idx" ON "pages_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_links_parent_id_idx" ON "pages_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_order_idx" ON "pages_blocks_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_parent_id_idx" ON "pages_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_path_idx" ON "pages_blocks_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_text_order_idx" ON "pages_blocks_media_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_text_parent_id_idx" ON "pages_blocks_media_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_text_path_idx" ON "pages_blocks_media_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_text_media_idx" ON "pages_blocks_media_text" USING btree ("media_id");
  CREATE INDEX "pages_blocks_media_block_order_idx" ON "pages_blocks_media_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_block_parent_id_idx" ON "pages_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_block_path_idx" ON "pages_blocks_media_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_block_media_idx" ON "pages_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "pages_blocks_feature_grid_items_order_idx" ON "pages_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_items_parent_id_idx" ON "pages_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_order_idx" ON "pages_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_parent_id_idx" ON "pages_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_path_idx" ON "pages_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_block_order_idx" ON "pages_blocks_form_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_form_block_parent_id_idx" ON "pages_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_form_block_path_idx" ON "pages_blocks_form_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_block_form_idx" ON "pages_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_services_id_idx" ON "pages_rels" USING btree ("services_id");
  CREATE INDEX "pages_rels_case_studies_id_idx" ON "pages_rels" USING btree ("case_studies_id");
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX "pages_rels_testimonials_id_idx" ON "pages_rels" USING btree ("testimonials_id");
  CREATE INDEX "pages_rels_team_id_idx" ON "pages_rels" USING btree ("team_id");
  CREATE INDEX "pages_rels_faqs_id_idx" ON "pages_rels" USING btree ("faqs_id");
  CREATE INDEX "_pages_v_blocks_hero_links_order_idx" ON "_pages_v_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_links_parent_id_idx" ON "_pages_v_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_pillars_order_idx" ON "_pages_v_blocks_hero_pillars" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_pillars_parent_id_idx" ON "_pages_v_blocks_hero_pillars" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_media_idx" ON "_pages_v_blocks_hero" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_marquee_items_order_idx" ON "_pages_v_blocks_marquee_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_marquee_items_parent_id_idx" ON "_pages_v_blocks_marquee_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_marquee_order_idx" ON "_pages_v_blocks_marquee" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_marquee_parent_id_idx" ON "_pages_v_blocks_marquee" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_marquee_path_idx" ON "_pages_v_blocks_marquee" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_statement_columns_order_idx" ON "_pages_v_blocks_statement_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_statement_columns_parent_id_idx" ON "_pages_v_blocks_statement_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_statement_order_idx" ON "_pages_v_blocks_statement" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_statement_parent_id_idx" ON "_pages_v_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_statement_path_idx" ON "_pages_v_blocks_statement" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_services_list_order_idx" ON "_pages_v_blocks_services_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_list_parent_id_idx" ON "_pages_v_blocks_services_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_list_path_idx" ON "_pages_v_blocks_services_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_work_grid_order_idx" ON "_pages_v_blocks_work_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_work_grid_parent_id_idx" ON "_pages_v_blocks_work_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_work_grid_path_idx" ON "_pages_v_blocks_work_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_approach_steps_order_idx" ON "_pages_v_blocks_approach_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_approach_steps_parent_id_idx" ON "_pages_v_blocks_approach_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_approach_order_idx" ON "_pages_v_blocks_approach" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_approach_parent_id_idx" ON "_pages_v_blocks_approach" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_approach_path_idx" ON "_pages_v_blocks_approach" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_items_order_idx" ON "_pages_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_items_parent_id_idx" ON "_pages_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_team_order_idx" ON "_pages_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_parent_id_idx" ON "_pages_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_path_idx" ON "_pages_v_blocks_team" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_posts_grid_order_idx" ON "_pages_v_blocks_posts_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_posts_grid_parent_id_idx" ON "_pages_v_blocks_posts_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_posts_grid_path_idx" ON "_pages_v_blocks_posts_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_links_order_idx" ON "_pages_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_links_parent_id_idx" ON "_pages_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_content_order_idx" ON "_pages_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_parent_id_idx" ON "_pages_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_path_idx" ON "_pages_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_text_order_idx" ON "_pages_v_blocks_media_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_text_parent_id_idx" ON "_pages_v_blocks_media_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_text_path_idx" ON "_pages_v_blocks_media_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_text_media_idx" ON "_pages_v_blocks_media_text" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_media_block_order_idx" ON "_pages_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_block_parent_id_idx" ON "_pages_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_block_path_idx" ON "_pages_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_block_media_idx" ON "_pages_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_items_order_idx" ON "_pages_v_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_grid_items_parent_id_idx" ON "_pages_v_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_order_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_grid_parent_id_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_path_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_block_order_idx" ON "_pages_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_form_block_parent_id_idx" ON "_pages_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_form_block_path_idx" ON "_pages_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_block_form_idx" ON "_pages_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_services_id_idx" ON "_pages_v_rels" USING btree ("services_id");
  CREATE INDEX "_pages_v_rels_case_studies_id_idx" ON "_pages_v_rels" USING btree ("case_studies_id");
  CREATE INDEX "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX "_pages_v_rels_testimonials_id_idx" ON "_pages_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "_pages_v_rels_team_id_idx" ON "_pages_v_rels" USING btree ("team_id");
  CREATE INDEX "_pages_v_rels_faqs_id_idx" ON "_pages_v_rels" USING btree ("faqs_id");
  CREATE INDEX "services_deliverables_order_idx" ON "services_deliverables" USING btree ("_order");
  CREATE INDEX "services_deliverables_parent_id_idx" ON "services_deliverables" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_statement_columns_order_idx" ON "services_blocks_statement_columns" USING btree ("_order");
  CREATE INDEX "services_blocks_statement_columns_parent_id_idx" ON "services_blocks_statement_columns" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_statement_order_idx" ON "services_blocks_statement" USING btree ("_order");
  CREATE INDEX "services_blocks_statement_parent_id_idx" ON "services_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_statement_path_idx" ON "services_blocks_statement" USING btree ("_path");
  CREATE INDEX "services_blocks_approach_steps_order_idx" ON "services_blocks_approach_steps" USING btree ("_order");
  CREATE INDEX "services_blocks_approach_steps_parent_id_idx" ON "services_blocks_approach_steps" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_approach_order_idx" ON "services_blocks_approach" USING btree ("_order");
  CREATE INDEX "services_blocks_approach_parent_id_idx" ON "services_blocks_approach" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_approach_path_idx" ON "services_blocks_approach" USING btree ("_path");
  CREATE INDEX "services_blocks_stats_items_order_idx" ON "services_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "services_blocks_stats_items_parent_id_idx" ON "services_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_stats_order_idx" ON "services_blocks_stats" USING btree ("_order");
  CREATE INDEX "services_blocks_stats_parent_id_idx" ON "services_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_stats_path_idx" ON "services_blocks_stats" USING btree ("_path");
  CREATE INDEX "services_blocks_testimonials_order_idx" ON "services_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "services_blocks_testimonials_parent_id_idx" ON "services_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_testimonials_path_idx" ON "services_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "services_blocks_faq_order_idx" ON "services_blocks_faq" USING btree ("_order");
  CREATE INDEX "services_blocks_faq_parent_id_idx" ON "services_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_faq_path_idx" ON "services_blocks_faq" USING btree ("_path");
  CREATE INDEX "services_blocks_cta_links_order_idx" ON "services_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "services_blocks_cta_links_parent_id_idx" ON "services_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_cta_order_idx" ON "services_blocks_cta" USING btree ("_order");
  CREATE INDEX "services_blocks_cta_parent_id_idx" ON "services_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_cta_path_idx" ON "services_blocks_cta" USING btree ("_path");
  CREATE INDEX "services_blocks_content_order_idx" ON "services_blocks_content" USING btree ("_order");
  CREATE INDEX "services_blocks_content_parent_id_idx" ON "services_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_content_path_idx" ON "services_blocks_content" USING btree ("_path");
  CREATE INDEX "services_blocks_media_text_order_idx" ON "services_blocks_media_text" USING btree ("_order");
  CREATE INDEX "services_blocks_media_text_parent_id_idx" ON "services_blocks_media_text" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_media_text_path_idx" ON "services_blocks_media_text" USING btree ("_path");
  CREATE INDEX "services_blocks_media_text_media_idx" ON "services_blocks_media_text" USING btree ("media_id");
  CREATE INDEX "services_blocks_media_block_order_idx" ON "services_blocks_media_block" USING btree ("_order");
  CREATE INDEX "services_blocks_media_block_parent_id_idx" ON "services_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_media_block_path_idx" ON "services_blocks_media_block" USING btree ("_path");
  CREATE INDEX "services_blocks_media_block_media_idx" ON "services_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "services_blocks_feature_grid_items_order_idx" ON "services_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "services_blocks_feature_grid_items_parent_id_idx" ON "services_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_feature_grid_order_idx" ON "services_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "services_blocks_feature_grid_parent_id_idx" ON "services_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_feature_grid_path_idx" ON "services_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "services_blocks_work_grid_order_idx" ON "services_blocks_work_grid" USING btree ("_order");
  CREATE INDEX "services_blocks_work_grid_parent_id_idx" ON "services_blocks_work_grid" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_work_grid_path_idx" ON "services_blocks_work_grid" USING btree ("_path");
  CREATE INDEX "services_blocks_form_block_order_idx" ON "services_blocks_form_block" USING btree ("_order");
  CREATE INDEX "services_blocks_form_block_parent_id_idx" ON "services_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_form_block_path_idx" ON "services_blocks_form_block" USING btree ("_path");
  CREATE INDEX "services_blocks_form_block_form_idx" ON "services_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "services__order_idx" ON "services" USING btree ("_order");
  CREATE INDEX "services_meta_meta_image_idx" ON "services" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services__status_idx" ON "services" USING btree ("_status");
  CREATE INDEX "services_rels_order_idx" ON "services_rels" USING btree ("order");
  CREATE INDEX "services_rels_parent_idx" ON "services_rels" USING btree ("parent_id");
  CREATE INDEX "services_rels_path_idx" ON "services_rels" USING btree ("path");
  CREATE INDEX "services_rels_pages_id_idx" ON "services_rels" USING btree ("pages_id");
  CREATE INDEX "services_rels_services_id_idx" ON "services_rels" USING btree ("services_id");
  CREATE INDEX "services_rels_case_studies_id_idx" ON "services_rels" USING btree ("case_studies_id");
  CREATE INDEX "services_rels_posts_id_idx" ON "services_rels" USING btree ("posts_id");
  CREATE INDEX "services_rels_testimonials_id_idx" ON "services_rels" USING btree ("testimonials_id");
  CREATE INDEX "services_rels_faqs_id_idx" ON "services_rels" USING btree ("faqs_id");
  CREATE INDEX "_services_v_version_deliverables_order_idx" ON "_services_v_version_deliverables" USING btree ("_order");
  CREATE INDEX "_services_v_version_deliverables_parent_id_idx" ON "_services_v_version_deliverables" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_statement_columns_order_idx" ON "_services_v_blocks_statement_columns" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_statement_columns_parent_id_idx" ON "_services_v_blocks_statement_columns" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_statement_order_idx" ON "_services_v_blocks_statement" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_statement_parent_id_idx" ON "_services_v_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_statement_path_idx" ON "_services_v_blocks_statement" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_approach_steps_order_idx" ON "_services_v_blocks_approach_steps" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_approach_steps_parent_id_idx" ON "_services_v_blocks_approach_steps" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_approach_order_idx" ON "_services_v_blocks_approach" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_approach_parent_id_idx" ON "_services_v_blocks_approach" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_approach_path_idx" ON "_services_v_blocks_approach" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_stats_items_order_idx" ON "_services_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_stats_items_parent_id_idx" ON "_services_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_stats_order_idx" ON "_services_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_stats_parent_id_idx" ON "_services_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_stats_path_idx" ON "_services_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_testimonials_order_idx" ON "_services_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_testimonials_parent_id_idx" ON "_services_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_testimonials_path_idx" ON "_services_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_faq_order_idx" ON "_services_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_faq_parent_id_idx" ON "_services_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_faq_path_idx" ON "_services_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_cta_links_order_idx" ON "_services_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_cta_links_parent_id_idx" ON "_services_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_cta_order_idx" ON "_services_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_cta_parent_id_idx" ON "_services_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_cta_path_idx" ON "_services_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_content_order_idx" ON "_services_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_content_parent_id_idx" ON "_services_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_content_path_idx" ON "_services_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_media_text_order_idx" ON "_services_v_blocks_media_text" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_media_text_parent_id_idx" ON "_services_v_blocks_media_text" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_media_text_path_idx" ON "_services_v_blocks_media_text" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_media_text_media_idx" ON "_services_v_blocks_media_text" USING btree ("media_id");
  CREATE INDEX "_services_v_blocks_media_block_order_idx" ON "_services_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_media_block_parent_id_idx" ON "_services_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_media_block_path_idx" ON "_services_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_media_block_media_idx" ON "_services_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_services_v_blocks_feature_grid_items_order_idx" ON "_services_v_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_feature_grid_items_parent_id_idx" ON "_services_v_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_feature_grid_order_idx" ON "_services_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_feature_grid_parent_id_idx" ON "_services_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_feature_grid_path_idx" ON "_services_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_work_grid_order_idx" ON "_services_v_blocks_work_grid" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_work_grid_parent_id_idx" ON "_services_v_blocks_work_grid" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_work_grid_path_idx" ON "_services_v_blocks_work_grid" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_form_block_order_idx" ON "_services_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_form_block_parent_id_idx" ON "_services_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_form_block_path_idx" ON "_services_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_form_block_form_idx" ON "_services_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
  CREATE INDEX "_services_v_version_version__order_idx" ON "_services_v" USING btree ("version__order");
  CREATE INDEX "_services_v_version_meta_version_meta_image_idx" ON "_services_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_services_v_version_version_slug_idx" ON "_services_v" USING btree ("version_slug");
  CREATE INDEX "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
  CREATE INDEX "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
  CREATE INDEX "_services_v_version_version__status_idx" ON "_services_v" USING btree ("version__status");
  CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE INDEX "_services_v_latest_idx" ON "_services_v" USING btree ("latest");
  CREATE INDEX "_services_v_autosave_idx" ON "_services_v" USING btree ("autosave");
  CREATE INDEX "_services_v_rels_order_idx" ON "_services_v_rels" USING btree ("order");
  CREATE INDEX "_services_v_rels_parent_idx" ON "_services_v_rels" USING btree ("parent_id");
  CREATE INDEX "_services_v_rels_path_idx" ON "_services_v_rels" USING btree ("path");
  CREATE INDEX "_services_v_rels_pages_id_idx" ON "_services_v_rels" USING btree ("pages_id");
  CREATE INDEX "_services_v_rels_services_id_idx" ON "_services_v_rels" USING btree ("services_id");
  CREATE INDEX "_services_v_rels_case_studies_id_idx" ON "_services_v_rels" USING btree ("case_studies_id");
  CREATE INDEX "_services_v_rels_posts_id_idx" ON "_services_v_rels" USING btree ("posts_id");
  CREATE INDEX "_services_v_rels_testimonials_id_idx" ON "_services_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "_services_v_rels_faqs_id_idx" ON "_services_v_rels" USING btree ("faqs_id");
  CREATE INDEX "case_studies_results_order_idx" ON "case_studies_results" USING btree ("_order");
  CREATE INDEX "case_studies_results_parent_id_idx" ON "case_studies_results" USING btree ("_parent_id");
  CREATE INDEX "case_studies_gallery_order_idx" ON "case_studies_gallery" USING btree ("_order");
  CREATE INDEX "case_studies_gallery_parent_id_idx" ON "case_studies_gallery" USING btree ("_parent_id");
  CREATE INDEX "case_studies_gallery_media_idx" ON "case_studies_gallery" USING btree ("media_id");
  CREATE INDEX "case_studies_blocks_statement_columns_order_idx" ON "case_studies_blocks_statement_columns" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_statement_columns_parent_id_idx" ON "case_studies_blocks_statement_columns" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_statement_order_idx" ON "case_studies_blocks_statement" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_statement_parent_id_idx" ON "case_studies_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_statement_path_idx" ON "case_studies_blocks_statement" USING btree ("_path");
  CREATE INDEX "case_studies_blocks_approach_steps_order_idx" ON "case_studies_blocks_approach_steps" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_approach_steps_parent_id_idx" ON "case_studies_blocks_approach_steps" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_approach_order_idx" ON "case_studies_blocks_approach" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_approach_parent_id_idx" ON "case_studies_blocks_approach" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_approach_path_idx" ON "case_studies_blocks_approach" USING btree ("_path");
  CREATE INDEX "case_studies_blocks_stats_items_order_idx" ON "case_studies_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_stats_items_parent_id_idx" ON "case_studies_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_stats_order_idx" ON "case_studies_blocks_stats" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_stats_parent_id_idx" ON "case_studies_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_stats_path_idx" ON "case_studies_blocks_stats" USING btree ("_path");
  CREATE INDEX "case_studies_blocks_testimonials_order_idx" ON "case_studies_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_testimonials_parent_id_idx" ON "case_studies_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_testimonials_path_idx" ON "case_studies_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "case_studies_blocks_faq_order_idx" ON "case_studies_blocks_faq" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_faq_parent_id_idx" ON "case_studies_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_faq_path_idx" ON "case_studies_blocks_faq" USING btree ("_path");
  CREATE INDEX "case_studies_blocks_cta_links_order_idx" ON "case_studies_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_cta_links_parent_id_idx" ON "case_studies_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_cta_order_idx" ON "case_studies_blocks_cta" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_cta_parent_id_idx" ON "case_studies_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_cta_path_idx" ON "case_studies_blocks_cta" USING btree ("_path");
  CREATE INDEX "case_studies_blocks_content_order_idx" ON "case_studies_blocks_content" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_content_parent_id_idx" ON "case_studies_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_content_path_idx" ON "case_studies_blocks_content" USING btree ("_path");
  CREATE INDEX "case_studies_blocks_media_text_order_idx" ON "case_studies_blocks_media_text" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_media_text_parent_id_idx" ON "case_studies_blocks_media_text" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_media_text_path_idx" ON "case_studies_blocks_media_text" USING btree ("_path");
  CREATE INDEX "case_studies_blocks_media_text_media_idx" ON "case_studies_blocks_media_text" USING btree ("media_id");
  CREATE INDEX "case_studies_blocks_media_block_order_idx" ON "case_studies_blocks_media_block" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_media_block_parent_id_idx" ON "case_studies_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_media_block_path_idx" ON "case_studies_blocks_media_block" USING btree ("_path");
  CREATE INDEX "case_studies_blocks_media_block_media_idx" ON "case_studies_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "case_studies_blocks_feature_grid_items_order_idx" ON "case_studies_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_feature_grid_items_parent_id_idx" ON "case_studies_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_feature_grid_order_idx" ON "case_studies_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_feature_grid_parent_id_idx" ON "case_studies_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_feature_grid_path_idx" ON "case_studies_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "case_studies_blocks_work_grid_order_idx" ON "case_studies_blocks_work_grid" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_work_grid_parent_id_idx" ON "case_studies_blocks_work_grid" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_work_grid_path_idx" ON "case_studies_blocks_work_grid" USING btree ("_path");
  CREATE INDEX "case_studies_blocks_form_block_order_idx" ON "case_studies_blocks_form_block" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_form_block_parent_id_idx" ON "case_studies_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_form_block_path_idx" ON "case_studies_blocks_form_block" USING btree ("_path");
  CREATE INDEX "case_studies_blocks_form_block_form_idx" ON "case_studies_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "case_studies_cover_image_idx" ON "case_studies" USING btree ("cover_image_id");
  CREATE INDEX "case_studies_testimonial_idx" ON "case_studies" USING btree ("testimonial_id");
  CREATE INDEX "case_studies_meta_meta_image_idx" ON "case_studies" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "case_studies_slug_idx" ON "case_studies" USING btree ("slug");
  CREATE INDEX "case_studies_updated_at_idx" ON "case_studies" USING btree ("updated_at");
  CREATE INDEX "case_studies_created_at_idx" ON "case_studies" USING btree ("created_at");
  CREATE INDEX "case_studies__status_idx" ON "case_studies" USING btree ("_status");
  CREATE INDEX "case_studies_rels_order_idx" ON "case_studies_rels" USING btree ("order");
  CREATE INDEX "case_studies_rels_parent_idx" ON "case_studies_rels" USING btree ("parent_id");
  CREATE INDEX "case_studies_rels_path_idx" ON "case_studies_rels" USING btree ("path");
  CREATE INDEX "case_studies_rels_services_id_idx" ON "case_studies_rels" USING btree ("services_id");
  CREATE INDEX "case_studies_rels_pages_id_idx" ON "case_studies_rels" USING btree ("pages_id");
  CREATE INDEX "case_studies_rels_case_studies_id_idx" ON "case_studies_rels" USING btree ("case_studies_id");
  CREATE INDEX "case_studies_rels_posts_id_idx" ON "case_studies_rels" USING btree ("posts_id");
  CREATE INDEX "case_studies_rels_testimonials_id_idx" ON "case_studies_rels" USING btree ("testimonials_id");
  CREATE INDEX "case_studies_rels_faqs_id_idx" ON "case_studies_rels" USING btree ("faqs_id");
  CREATE INDEX "_case_studies_v_version_results_order_idx" ON "_case_studies_v_version_results" USING btree ("_order");
  CREATE INDEX "_case_studies_v_version_results_parent_id_idx" ON "_case_studies_v_version_results" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_version_gallery_order_idx" ON "_case_studies_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_case_studies_v_version_gallery_parent_id_idx" ON "_case_studies_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_version_gallery_media_idx" ON "_case_studies_v_version_gallery" USING btree ("media_id");
  CREATE INDEX "_case_studies_v_blocks_statement_columns_order_idx" ON "_case_studies_v_blocks_statement_columns" USING btree ("_order");
  CREATE INDEX "_case_studies_v_blocks_statement_columns_parent_id_idx" ON "_case_studies_v_blocks_statement_columns" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_blocks_statement_order_idx" ON "_case_studies_v_blocks_statement" USING btree ("_order");
  CREATE INDEX "_case_studies_v_blocks_statement_parent_id_idx" ON "_case_studies_v_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_blocks_statement_path_idx" ON "_case_studies_v_blocks_statement" USING btree ("_path");
  CREATE INDEX "_case_studies_v_blocks_approach_steps_order_idx" ON "_case_studies_v_blocks_approach_steps" USING btree ("_order");
  CREATE INDEX "_case_studies_v_blocks_approach_steps_parent_id_idx" ON "_case_studies_v_blocks_approach_steps" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_blocks_approach_order_idx" ON "_case_studies_v_blocks_approach" USING btree ("_order");
  CREATE INDEX "_case_studies_v_blocks_approach_parent_id_idx" ON "_case_studies_v_blocks_approach" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_blocks_approach_path_idx" ON "_case_studies_v_blocks_approach" USING btree ("_path");
  CREATE INDEX "_case_studies_v_blocks_stats_items_order_idx" ON "_case_studies_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_case_studies_v_blocks_stats_items_parent_id_idx" ON "_case_studies_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_blocks_stats_order_idx" ON "_case_studies_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_case_studies_v_blocks_stats_parent_id_idx" ON "_case_studies_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_blocks_stats_path_idx" ON "_case_studies_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_case_studies_v_blocks_testimonials_order_idx" ON "_case_studies_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_case_studies_v_blocks_testimonials_parent_id_idx" ON "_case_studies_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_blocks_testimonials_path_idx" ON "_case_studies_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_case_studies_v_blocks_faq_order_idx" ON "_case_studies_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_case_studies_v_blocks_faq_parent_id_idx" ON "_case_studies_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_blocks_faq_path_idx" ON "_case_studies_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_case_studies_v_blocks_cta_links_order_idx" ON "_case_studies_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_case_studies_v_blocks_cta_links_parent_id_idx" ON "_case_studies_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_blocks_cta_order_idx" ON "_case_studies_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_case_studies_v_blocks_cta_parent_id_idx" ON "_case_studies_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_blocks_cta_path_idx" ON "_case_studies_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_case_studies_v_blocks_content_order_idx" ON "_case_studies_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_case_studies_v_blocks_content_parent_id_idx" ON "_case_studies_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_blocks_content_path_idx" ON "_case_studies_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_case_studies_v_blocks_media_text_order_idx" ON "_case_studies_v_blocks_media_text" USING btree ("_order");
  CREATE INDEX "_case_studies_v_blocks_media_text_parent_id_idx" ON "_case_studies_v_blocks_media_text" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_blocks_media_text_path_idx" ON "_case_studies_v_blocks_media_text" USING btree ("_path");
  CREATE INDEX "_case_studies_v_blocks_media_text_media_idx" ON "_case_studies_v_blocks_media_text" USING btree ("media_id");
  CREATE INDEX "_case_studies_v_blocks_media_block_order_idx" ON "_case_studies_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_case_studies_v_blocks_media_block_parent_id_idx" ON "_case_studies_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_blocks_media_block_path_idx" ON "_case_studies_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_case_studies_v_blocks_media_block_media_idx" ON "_case_studies_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_case_studies_v_blocks_feature_grid_items_order_idx" ON "_case_studies_v_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "_case_studies_v_blocks_feature_grid_items_parent_id_idx" ON "_case_studies_v_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_blocks_feature_grid_order_idx" ON "_case_studies_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_case_studies_v_blocks_feature_grid_parent_id_idx" ON "_case_studies_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_blocks_feature_grid_path_idx" ON "_case_studies_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_case_studies_v_blocks_work_grid_order_idx" ON "_case_studies_v_blocks_work_grid" USING btree ("_order");
  CREATE INDEX "_case_studies_v_blocks_work_grid_parent_id_idx" ON "_case_studies_v_blocks_work_grid" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_blocks_work_grid_path_idx" ON "_case_studies_v_blocks_work_grid" USING btree ("_path");
  CREATE INDEX "_case_studies_v_blocks_form_block_order_idx" ON "_case_studies_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX "_case_studies_v_blocks_form_block_parent_id_idx" ON "_case_studies_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_blocks_form_block_path_idx" ON "_case_studies_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX "_case_studies_v_blocks_form_block_form_idx" ON "_case_studies_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "_case_studies_v_parent_idx" ON "_case_studies_v" USING btree ("parent_id");
  CREATE INDEX "_case_studies_v_version_version_cover_image_idx" ON "_case_studies_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_case_studies_v_version_version_testimonial_idx" ON "_case_studies_v" USING btree ("version_testimonial_id");
  CREATE INDEX "_case_studies_v_version_meta_version_meta_image_idx" ON "_case_studies_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_case_studies_v_version_version_slug_idx" ON "_case_studies_v" USING btree ("version_slug");
  CREATE INDEX "_case_studies_v_version_version_updated_at_idx" ON "_case_studies_v" USING btree ("version_updated_at");
  CREATE INDEX "_case_studies_v_version_version_created_at_idx" ON "_case_studies_v" USING btree ("version_created_at");
  CREATE INDEX "_case_studies_v_version_version__status_idx" ON "_case_studies_v" USING btree ("version__status");
  CREATE INDEX "_case_studies_v_created_at_idx" ON "_case_studies_v" USING btree ("created_at");
  CREATE INDEX "_case_studies_v_updated_at_idx" ON "_case_studies_v" USING btree ("updated_at");
  CREATE INDEX "_case_studies_v_latest_idx" ON "_case_studies_v" USING btree ("latest");
  CREATE INDEX "_case_studies_v_autosave_idx" ON "_case_studies_v" USING btree ("autosave");
  CREATE INDEX "_case_studies_v_rels_order_idx" ON "_case_studies_v_rels" USING btree ("order");
  CREATE INDEX "_case_studies_v_rels_parent_idx" ON "_case_studies_v_rels" USING btree ("parent_id");
  CREATE INDEX "_case_studies_v_rels_path_idx" ON "_case_studies_v_rels" USING btree ("path");
  CREATE INDEX "_case_studies_v_rels_services_id_idx" ON "_case_studies_v_rels" USING btree ("services_id");
  CREATE INDEX "_case_studies_v_rels_pages_id_idx" ON "_case_studies_v_rels" USING btree ("pages_id");
  CREATE INDEX "_case_studies_v_rels_case_studies_id_idx" ON "_case_studies_v_rels" USING btree ("case_studies_id");
  CREATE INDEX "_case_studies_v_rels_posts_id_idx" ON "_case_studies_v_rels" USING btree ("posts_id");
  CREATE INDEX "_case_studies_v_rels_testimonials_id_idx" ON "_case_studies_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "_case_studies_v_rels_faqs_id_idx" ON "_case_studies_v_rels" USING btree ("faqs_id");
  CREATE INDEX "posts_cover_image_idx" ON "posts" USING btree ("cover_image_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE INDEX "posts_author_idx" ON "posts" USING btree ("author_id");
  CREATE INDEX "posts_created_by_idx" ON "posts" USING btree ("created_by_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_cover_image_idx" ON "_posts_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_posts_v_version_version_author_idx" ON "_posts_v" USING btree ("version_author_id");
  CREATE INDEX "_posts_v_version_version_created_by_idx" ON "_posts_v" USING btree ("version_created_by_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "testimonials__order_idx" ON "testimonials" USING btree ("_order");
  CREATE INDEX "testimonials_avatar_idx" ON "testimonials" USING btree ("avatar_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "team__order_idx" ON "team" USING btree ("_order");
  CREATE INDEX "team_photo_idx" ON "team" USING btree ("photo_id");
  CREATE INDEX "team_updated_at_idx" ON "team" USING btree ("updated_at");
  CREATE INDEX "team_created_at_idx" ON "team" USING btree ("created_at");
  CREATE INDEX "faqs__order_idx" ON "faqs" USING btree ("_order");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE INDEX "media_folder_idx" ON "media" USING btree ("folder_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE INDEX "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_ip_hash_idx" ON "form_submissions" USING btree ("ip_hash");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_folders_folder_type_order_idx" ON "payload_folders_folder_type" USING btree ("order");
  CREATE INDEX "payload_folders_folder_type_parent_idx" ON "payload_folders_folder_type" USING btree ("parent_id");
  CREATE INDEX "payload_folders_name_idx" ON "payload_folders" USING btree ("name");
  CREATE INDEX "payload_folders_folder_idx" ON "payload_folders" USING btree ("folder_id");
  CREATE INDEX "payload_folders_updated_at_idx" ON "payload_folders" USING btree ("updated_at");
  CREATE INDEX "payload_folders_created_at_idx" ON "payload_folders" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_case_studies_id_idx" ON "payload_locked_documents_rels" USING btree ("case_studies_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_team_id_idx" ON "payload_locked_documents_rels" USING btree ("team_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_payload_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_folders_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX "header_rels_services_id_idx" ON "header_rels" USING btree ("services_id");
  CREATE INDEX "header_rels_case_studies_id_idx" ON "header_rels" USING btree ("case_studies_id");
  CREATE INDEX "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  CREATE INDEX "_header_v_version_nav_items_order_idx" ON "_header_v_version_nav_items" USING btree ("_order");
  CREATE INDEX "_header_v_version_nav_items_parent_id_idx" ON "_header_v_version_nav_items" USING btree ("_parent_id");
  CREATE INDEX "_header_v_created_at_idx" ON "_header_v" USING btree ("created_at");
  CREATE INDEX "_header_v_updated_at_idx" ON "_header_v" USING btree ("updated_at");
  CREATE INDEX "_header_v_rels_order_idx" ON "_header_v_rels" USING btree ("order");
  CREATE INDEX "_header_v_rels_parent_idx" ON "_header_v_rels" USING btree ("parent_id");
  CREATE INDEX "_header_v_rels_path_idx" ON "_header_v_rels" USING btree ("path");
  CREATE INDEX "_header_v_rels_pages_id_idx" ON "_header_v_rels" USING btree ("pages_id");
  CREATE INDEX "_header_v_rels_services_id_idx" ON "_header_v_rels" USING btree ("services_id");
  CREATE INDEX "_header_v_rels_case_studies_id_idx" ON "_header_v_rels" USING btree ("case_studies_id");
  CREATE INDEX "_header_v_rels_posts_id_idx" ON "_header_v_rels" USING btree ("posts_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
  CREATE INDEX "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");
  CREATE INDEX "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
  CREATE INDEX "footer_rels_services_id_idx" ON "footer_rels" USING btree ("services_id");
  CREATE INDEX "footer_rels_case_studies_id_idx" ON "footer_rels" USING btree ("case_studies_id");
  CREATE INDEX "footer_rels_posts_id_idx" ON "footer_rels" USING btree ("posts_id");
  CREATE INDEX "_footer_v_version_columns_links_order_idx" ON "_footer_v_version_columns_links" USING btree ("_order");
  CREATE INDEX "_footer_v_version_columns_links_parent_id_idx" ON "_footer_v_version_columns_links" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_columns_order_idx" ON "_footer_v_version_columns" USING btree ("_order");
  CREATE INDEX "_footer_v_version_columns_parent_id_idx" ON "_footer_v_version_columns" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_legal_links_order_idx" ON "_footer_v_version_legal_links" USING btree ("_order");
  CREATE INDEX "_footer_v_version_legal_links_parent_id_idx" ON "_footer_v_version_legal_links" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_created_at_idx" ON "_footer_v" USING btree ("created_at");
  CREATE INDEX "_footer_v_updated_at_idx" ON "_footer_v" USING btree ("updated_at");
  CREATE INDEX "_footer_v_rels_order_idx" ON "_footer_v_rels" USING btree ("order");
  CREATE INDEX "_footer_v_rels_parent_idx" ON "_footer_v_rels" USING btree ("parent_id");
  CREATE INDEX "_footer_v_rels_path_idx" ON "_footer_v_rels" USING btree ("path");
  CREATE INDEX "_footer_v_rels_pages_id_idx" ON "_footer_v_rels" USING btree ("pages_id");
  CREATE INDEX "_footer_v_rels_services_id_idx" ON "_footer_v_rels" USING btree ("services_id");
  CREATE INDEX "_footer_v_rels_case_studies_id_idx" ON "_footer_v_rels" USING btree ("case_studies_id");
  CREATE INDEX "_footer_v_rels_posts_id_idx" ON "_footer_v_rels" USING btree ("posts_id");
  CREATE INDEX "settings_social_order_idx" ON "settings_social" USING btree ("_order");
  CREATE INDEX "settings_social_parent_id_idx" ON "settings_social" USING btree ("_parent_id");
  CREATE INDEX "settings_logo_idx" ON "settings" USING btree ("logo_id");
  CREATE INDEX "settings_logo_mark_idx" ON "settings" USING btree ("logo_mark_id");
  CREATE INDEX "settings_favicon_idx" ON "settings" USING btree ("favicon_id");
  CREATE INDEX "settings_seo_seo_image_idx" ON "settings" USING btree ("seo_image_id");
  CREATE INDEX "_settings_v_version_social_order_idx" ON "_settings_v_version_social" USING btree ("_order");
  CREATE INDEX "_settings_v_version_social_parent_id_idx" ON "_settings_v_version_social" USING btree ("_parent_id");
  CREATE INDEX "_settings_v_version_version_logo_idx" ON "_settings_v" USING btree ("version_logo_id");
  CREATE INDEX "_settings_v_version_version_logo_mark_idx" ON "_settings_v" USING btree ("version_logo_mark_id");
  CREATE INDEX "_settings_v_version_version_favicon_idx" ON "_settings_v" USING btree ("version_favicon_id");
  CREATE INDEX "_settings_v_version_seo_version_seo_image_idx" ON "_settings_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_settings_v_created_at_idx" ON "_settings_v" USING btree ("created_at");
  CREATE INDEX "_settings_v_updated_at_idx" ON "_settings_v" USING btree ("updated_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_hero_links" CASCADE;
  DROP TABLE "pages_blocks_hero_pillars" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_marquee_items" CASCADE;
  DROP TABLE "pages_blocks_marquee" CASCADE;
  DROP TABLE "pages_blocks_statement_columns" CASCADE;
  DROP TABLE "pages_blocks_statement" CASCADE;
  DROP TABLE "pages_blocks_services_list" CASCADE;
  DROP TABLE "pages_blocks_work_grid" CASCADE;
  DROP TABLE "pages_blocks_approach_steps" CASCADE;
  DROP TABLE "pages_blocks_approach" CASCADE;
  DROP TABLE "pages_blocks_stats_items" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_team" CASCADE;
  DROP TABLE "pages_blocks_posts_grid" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_cta_links" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_content" CASCADE;
  DROP TABLE "pages_blocks_media_text" CASCADE;
  DROP TABLE "pages_blocks_media_block" CASCADE;
  DROP TABLE "pages_blocks_feature_grid_items" CASCADE;
  DROP TABLE "pages_blocks_feature_grid" CASCADE;
  DROP TABLE "pages_blocks_form_block" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_pillars" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_marquee_items" CASCADE;
  DROP TABLE "_pages_v_blocks_marquee" CASCADE;
  DROP TABLE "_pages_v_blocks_statement_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_statement" CASCADE;
  DROP TABLE "_pages_v_blocks_services_list" CASCADE;
  DROP TABLE "_pages_v_blocks_work_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_approach_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_approach" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_items" CASCADE;
  DROP TABLE "_pages_v_blocks_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_team" CASCADE;
  DROP TABLE "_pages_v_blocks_posts_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_content" CASCADE;
  DROP TABLE "_pages_v_blocks_media_text" CASCADE;
  DROP TABLE "_pages_v_blocks_media_block" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_form_block" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "services_deliverables" CASCADE;
  DROP TABLE "services_blocks_statement_columns" CASCADE;
  DROP TABLE "services_blocks_statement" CASCADE;
  DROP TABLE "services_blocks_approach_steps" CASCADE;
  DROP TABLE "services_blocks_approach" CASCADE;
  DROP TABLE "services_blocks_stats_items" CASCADE;
  DROP TABLE "services_blocks_stats" CASCADE;
  DROP TABLE "services_blocks_testimonials" CASCADE;
  DROP TABLE "services_blocks_faq" CASCADE;
  DROP TABLE "services_blocks_cta_links" CASCADE;
  DROP TABLE "services_blocks_cta" CASCADE;
  DROP TABLE "services_blocks_content" CASCADE;
  DROP TABLE "services_blocks_media_text" CASCADE;
  DROP TABLE "services_blocks_media_block" CASCADE;
  DROP TABLE "services_blocks_feature_grid_items" CASCADE;
  DROP TABLE "services_blocks_feature_grid" CASCADE;
  DROP TABLE "services_blocks_work_grid" CASCADE;
  DROP TABLE "services_blocks_form_block" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_rels" CASCADE;
  DROP TABLE "_services_v_version_deliverables" CASCADE;
  DROP TABLE "_services_v_blocks_statement_columns" CASCADE;
  DROP TABLE "_services_v_blocks_statement" CASCADE;
  DROP TABLE "_services_v_blocks_approach_steps" CASCADE;
  DROP TABLE "_services_v_blocks_approach" CASCADE;
  DROP TABLE "_services_v_blocks_stats_items" CASCADE;
  DROP TABLE "_services_v_blocks_stats" CASCADE;
  DROP TABLE "_services_v_blocks_testimonials" CASCADE;
  DROP TABLE "_services_v_blocks_faq" CASCADE;
  DROP TABLE "_services_v_blocks_cta_links" CASCADE;
  DROP TABLE "_services_v_blocks_cta" CASCADE;
  DROP TABLE "_services_v_blocks_content" CASCADE;
  DROP TABLE "_services_v_blocks_media_text" CASCADE;
  DROP TABLE "_services_v_blocks_media_block" CASCADE;
  DROP TABLE "_services_v_blocks_feature_grid_items" CASCADE;
  DROP TABLE "_services_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_services_v_blocks_work_grid" CASCADE;
  DROP TABLE "_services_v_blocks_form_block" CASCADE;
  DROP TABLE "_services_v" CASCADE;
  DROP TABLE "_services_v_rels" CASCADE;
  DROP TABLE "case_studies_results" CASCADE;
  DROP TABLE "case_studies_gallery" CASCADE;
  DROP TABLE "case_studies_blocks_statement_columns" CASCADE;
  DROP TABLE "case_studies_blocks_statement" CASCADE;
  DROP TABLE "case_studies_blocks_approach_steps" CASCADE;
  DROP TABLE "case_studies_blocks_approach" CASCADE;
  DROP TABLE "case_studies_blocks_stats_items" CASCADE;
  DROP TABLE "case_studies_blocks_stats" CASCADE;
  DROP TABLE "case_studies_blocks_testimonials" CASCADE;
  DROP TABLE "case_studies_blocks_faq" CASCADE;
  DROP TABLE "case_studies_blocks_cta_links" CASCADE;
  DROP TABLE "case_studies_blocks_cta" CASCADE;
  DROP TABLE "case_studies_blocks_content" CASCADE;
  DROP TABLE "case_studies_blocks_media_text" CASCADE;
  DROP TABLE "case_studies_blocks_media_block" CASCADE;
  DROP TABLE "case_studies_blocks_feature_grid_items" CASCADE;
  DROP TABLE "case_studies_blocks_feature_grid" CASCADE;
  DROP TABLE "case_studies_blocks_work_grid" CASCADE;
  DROP TABLE "case_studies_blocks_form_block" CASCADE;
  DROP TABLE "case_studies" CASCADE;
  DROP TABLE "case_studies_rels" CASCADE;
  DROP TABLE "_case_studies_v_version_results" CASCADE;
  DROP TABLE "_case_studies_v_version_gallery" CASCADE;
  DROP TABLE "_case_studies_v_blocks_statement_columns" CASCADE;
  DROP TABLE "_case_studies_v_blocks_statement" CASCADE;
  DROP TABLE "_case_studies_v_blocks_approach_steps" CASCADE;
  DROP TABLE "_case_studies_v_blocks_approach" CASCADE;
  DROP TABLE "_case_studies_v_blocks_stats_items" CASCADE;
  DROP TABLE "_case_studies_v_blocks_stats" CASCADE;
  DROP TABLE "_case_studies_v_blocks_testimonials" CASCADE;
  DROP TABLE "_case_studies_v_blocks_faq" CASCADE;
  DROP TABLE "_case_studies_v_blocks_cta_links" CASCADE;
  DROP TABLE "_case_studies_v_blocks_cta" CASCADE;
  DROP TABLE "_case_studies_v_blocks_content" CASCADE;
  DROP TABLE "_case_studies_v_blocks_media_text" CASCADE;
  DROP TABLE "_case_studies_v_blocks_media_block" CASCADE;
  DROP TABLE "_case_studies_v_blocks_feature_grid_items" CASCADE;
  DROP TABLE "_case_studies_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_case_studies_v_blocks_work_grid" CASCADE;
  DROP TABLE "_case_studies_v_blocks_form_block" CASCADE;
  DROP TABLE "_case_studies_v" CASCADE;
  DROP TABLE "_case_studies_v_rels" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "team" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_folders_folder_type" CASCADE;
  DROP TABLE "payload_folders" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "_header_v_version_nav_items" CASCADE;
  DROP TABLE "_header_v" CASCADE;
  DROP TABLE "_header_v_rels" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_legal_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TABLE "_footer_v_version_columns_links" CASCADE;
  DROP TABLE "_footer_v_version_columns" CASCADE;
  DROP TABLE "_footer_v_version_legal_links" CASCADE;
  DROP TABLE "_footer_v" CASCADE;
  DROP TABLE "_footer_v_rels" CASCADE;
  DROP TABLE "settings_social" CASCADE;
  DROP TABLE "settings" CASCADE;
  DROP TABLE "_settings_v_version_social" CASCADE;
  DROP TABLE "_settings_v" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_hero_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_hero_style";
  DROP TYPE "public"."enum_pages_blocks_hero_theme";
  DROP TYPE "public"."enum_pages_blocks_marquee_tone";
  DROP TYPE "public"."enum_pages_blocks_statement_link_type";
  DROP TYPE "public"."enum_pages_blocks_statement_theme";
  DROP TYPE "public"."enum_pages_blocks_services_list_source";
  DROP TYPE "public"."enum_pages_blocks_services_list_detail";
  DROP TYPE "public"."enum_pages_blocks_services_list_link_type";
  DROP TYPE "public"."enum_pages_blocks_services_list_theme";
  DROP TYPE "public"."enum_pages_blocks_work_grid_source";
  DROP TYPE "public"."enum_pages_blocks_work_grid_link_type";
  DROP TYPE "public"."enum_pages_blocks_work_grid_theme";
  DROP TYPE "public"."enum_pages_blocks_approach_theme";
  DROP TYPE "public"."enum_pages_blocks_stats_theme";
  DROP TYPE "public"."enum_pages_blocks_testimonials_source";
  DROP TYPE "public"."enum_pages_blocks_testimonials_theme";
  DROP TYPE "public"."enum_pages_blocks_team_source";
  DROP TYPE "public"."enum_pages_blocks_team_theme";
  DROP TYPE "public"."enum_pages_blocks_posts_grid_source";
  DROP TYPE "public"."enum_pages_blocks_posts_grid_link_type";
  DROP TYPE "public"."enum_pages_blocks_posts_grid_theme";
  DROP TYPE "public"."enum_pages_blocks_faq_source";
  DROP TYPE "public"."enum_pages_blocks_faq_theme";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_cta_theme";
  DROP TYPE "public"."enum_pages_blocks_content_layout";
  DROP TYPE "public"."enum_pages_blocks_content_theme";
  DROP TYPE "public"."enum_pages_blocks_media_text_media_position";
  DROP TYPE "public"."enum_pages_blocks_media_text_media_style";
  DROP TYPE "public"."enum_pages_blocks_media_text_link_type";
  DROP TYPE "public"."enum_pages_blocks_media_text_theme";
  DROP TYPE "public"."enum_pages_blocks_media_block_size";
  DROP TYPE "public"."enum_pages_blocks_media_block_theme";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_theme";
  DROP TYPE "public"."enum_pages_blocks_form_block_theme";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_hero_style";
  DROP TYPE "public"."enum__pages_v_blocks_hero_theme";
  DROP TYPE "public"."enum__pages_v_blocks_marquee_tone";
  DROP TYPE "public"."enum__pages_v_blocks_statement_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_statement_theme";
  DROP TYPE "public"."enum__pages_v_blocks_services_list_source";
  DROP TYPE "public"."enum__pages_v_blocks_services_list_detail";
  DROP TYPE "public"."enum__pages_v_blocks_services_list_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_services_list_theme";
  DROP TYPE "public"."enum__pages_v_blocks_work_grid_source";
  DROP TYPE "public"."enum__pages_v_blocks_work_grid_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_work_grid_theme";
  DROP TYPE "public"."enum__pages_v_blocks_approach_theme";
  DROP TYPE "public"."enum__pages_v_blocks_stats_theme";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_source";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_theme";
  DROP TYPE "public"."enum__pages_v_blocks_team_source";
  DROP TYPE "public"."enum__pages_v_blocks_team_theme";
  DROP TYPE "public"."enum__pages_v_blocks_posts_grid_source";
  DROP TYPE "public"."enum__pages_v_blocks_posts_grid_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_posts_grid_theme";
  DROP TYPE "public"."enum__pages_v_blocks_faq_source";
  DROP TYPE "public"."enum__pages_v_blocks_faq_theme";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cta_theme";
  DROP TYPE "public"."enum__pages_v_blocks_content_layout";
  DROP TYPE "public"."enum__pages_v_blocks_content_theme";
  DROP TYPE "public"."enum__pages_v_blocks_media_text_media_position";
  DROP TYPE "public"."enum__pages_v_blocks_media_text_media_style";
  DROP TYPE "public"."enum__pages_v_blocks_media_text_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_media_text_theme";
  DROP TYPE "public"."enum__pages_v_blocks_media_block_size";
  DROP TYPE "public"."enum__pages_v_blocks_media_block_theme";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_theme";
  DROP TYPE "public"."enum__pages_v_blocks_form_block_theme";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_services_blocks_statement_link_type";
  DROP TYPE "public"."enum_services_blocks_statement_theme";
  DROP TYPE "public"."enum_services_blocks_approach_theme";
  DROP TYPE "public"."enum_services_blocks_stats_theme";
  DROP TYPE "public"."enum_services_blocks_testimonials_source";
  DROP TYPE "public"."enum_services_blocks_testimonials_theme";
  DROP TYPE "public"."enum_services_blocks_faq_source";
  DROP TYPE "public"."enum_services_blocks_faq_theme";
  DROP TYPE "public"."enum_services_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_services_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_services_blocks_cta_theme";
  DROP TYPE "public"."enum_services_blocks_content_layout";
  DROP TYPE "public"."enum_services_blocks_content_theme";
  DROP TYPE "public"."enum_services_blocks_media_text_media_position";
  DROP TYPE "public"."enum_services_blocks_media_text_media_style";
  DROP TYPE "public"."enum_services_blocks_media_text_link_type";
  DROP TYPE "public"."enum_services_blocks_media_text_theme";
  DROP TYPE "public"."enum_services_blocks_media_block_size";
  DROP TYPE "public"."enum_services_blocks_media_block_theme";
  DROP TYPE "public"."enum_services_blocks_feature_grid_theme";
  DROP TYPE "public"."enum_services_blocks_work_grid_source";
  DROP TYPE "public"."enum_services_blocks_work_grid_link_type";
  DROP TYPE "public"."enum_services_blocks_work_grid_theme";
  DROP TYPE "public"."enum_services_blocks_form_block_theme";
  DROP TYPE "public"."enum_services_icon";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum__services_v_blocks_statement_link_type";
  DROP TYPE "public"."enum__services_v_blocks_statement_theme";
  DROP TYPE "public"."enum__services_v_blocks_approach_theme";
  DROP TYPE "public"."enum__services_v_blocks_stats_theme";
  DROP TYPE "public"."enum__services_v_blocks_testimonials_source";
  DROP TYPE "public"."enum__services_v_blocks_testimonials_theme";
  DROP TYPE "public"."enum__services_v_blocks_faq_source";
  DROP TYPE "public"."enum__services_v_blocks_faq_theme";
  DROP TYPE "public"."enum__services_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__services_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__services_v_blocks_cta_theme";
  DROP TYPE "public"."enum__services_v_blocks_content_layout";
  DROP TYPE "public"."enum__services_v_blocks_content_theme";
  DROP TYPE "public"."enum__services_v_blocks_media_text_media_position";
  DROP TYPE "public"."enum__services_v_blocks_media_text_media_style";
  DROP TYPE "public"."enum__services_v_blocks_media_text_link_type";
  DROP TYPE "public"."enum__services_v_blocks_media_text_theme";
  DROP TYPE "public"."enum__services_v_blocks_media_block_size";
  DROP TYPE "public"."enum__services_v_blocks_media_block_theme";
  DROP TYPE "public"."enum__services_v_blocks_feature_grid_theme";
  DROP TYPE "public"."enum__services_v_blocks_work_grid_source";
  DROP TYPE "public"."enum__services_v_blocks_work_grid_link_type";
  DROP TYPE "public"."enum__services_v_blocks_work_grid_theme";
  DROP TYPE "public"."enum__services_v_blocks_form_block_theme";
  DROP TYPE "public"."enum__services_v_version_icon";
  DROP TYPE "public"."enum__services_v_version_status";
  DROP TYPE "public"."enum_case_studies_blocks_statement_link_type";
  DROP TYPE "public"."enum_case_studies_blocks_statement_theme";
  DROP TYPE "public"."enum_case_studies_blocks_approach_theme";
  DROP TYPE "public"."enum_case_studies_blocks_stats_theme";
  DROP TYPE "public"."enum_case_studies_blocks_testimonials_source";
  DROP TYPE "public"."enum_case_studies_blocks_testimonials_theme";
  DROP TYPE "public"."enum_case_studies_blocks_faq_source";
  DROP TYPE "public"."enum_case_studies_blocks_faq_theme";
  DROP TYPE "public"."enum_case_studies_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_case_studies_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_case_studies_blocks_cta_theme";
  DROP TYPE "public"."enum_case_studies_blocks_content_layout";
  DROP TYPE "public"."enum_case_studies_blocks_content_theme";
  DROP TYPE "public"."enum_case_studies_blocks_media_text_media_position";
  DROP TYPE "public"."enum_case_studies_blocks_media_text_media_style";
  DROP TYPE "public"."enum_case_studies_blocks_media_text_link_type";
  DROP TYPE "public"."enum_case_studies_blocks_media_text_theme";
  DROP TYPE "public"."enum_case_studies_blocks_media_block_size";
  DROP TYPE "public"."enum_case_studies_blocks_media_block_theme";
  DROP TYPE "public"."enum_case_studies_blocks_feature_grid_theme";
  DROP TYPE "public"."enum_case_studies_blocks_work_grid_source";
  DROP TYPE "public"."enum_case_studies_blocks_work_grid_link_type";
  DROP TYPE "public"."enum_case_studies_blocks_work_grid_theme";
  DROP TYPE "public"."enum_case_studies_blocks_form_block_theme";
  DROP TYPE "public"."enum_case_studies_status";
  DROP TYPE "public"."enum__case_studies_v_blocks_statement_link_type";
  DROP TYPE "public"."enum__case_studies_v_blocks_statement_theme";
  DROP TYPE "public"."enum__case_studies_v_blocks_approach_theme";
  DROP TYPE "public"."enum__case_studies_v_blocks_stats_theme";
  DROP TYPE "public"."enum__case_studies_v_blocks_testimonials_source";
  DROP TYPE "public"."enum__case_studies_v_blocks_testimonials_theme";
  DROP TYPE "public"."enum__case_studies_v_blocks_faq_source";
  DROP TYPE "public"."enum__case_studies_v_blocks_faq_theme";
  DROP TYPE "public"."enum__case_studies_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__case_studies_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__case_studies_v_blocks_cta_theme";
  DROP TYPE "public"."enum__case_studies_v_blocks_content_layout";
  DROP TYPE "public"."enum__case_studies_v_blocks_content_theme";
  DROP TYPE "public"."enum__case_studies_v_blocks_media_text_media_position";
  DROP TYPE "public"."enum__case_studies_v_blocks_media_text_media_style";
  DROP TYPE "public"."enum__case_studies_v_blocks_media_text_link_type";
  DROP TYPE "public"."enum__case_studies_v_blocks_media_text_theme";
  DROP TYPE "public"."enum__case_studies_v_blocks_media_block_size";
  DROP TYPE "public"."enum__case_studies_v_blocks_media_block_theme";
  DROP TYPE "public"."enum__case_studies_v_blocks_feature_grid_theme";
  DROP TYPE "public"."enum__case_studies_v_blocks_work_grid_source";
  DROP TYPE "public"."enum__case_studies_v_blocks_work_grid_link_type";
  DROP TYPE "public"."enum__case_studies_v_blocks_work_grid_theme";
  DROP TYPE "public"."enum__case_studies_v_blocks_form_block_theme";
  DROP TYPE "public"."enum__case_studies_v_version_status";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_form_submissions_status";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_payload_folders_folder_type";
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_header_cta_type";
  DROP TYPE "public"."enum__header_v_version_nav_items_link_type";
  DROP TYPE "public"."enum__header_v_version_cta_type";
  DROP TYPE "public"."enum_footer_columns_links_link_type";
  DROP TYPE "public"."enum_footer_legal_links_link_type";
  DROP TYPE "public"."enum__footer_v_version_columns_links_link_type";
  DROP TYPE "public"."enum__footer_v_version_legal_links_link_type";
  DROP TYPE "public"."enum_settings_social_platform";
  DROP TYPE "public"."enum__settings_v_version_social_platform";`)
}
