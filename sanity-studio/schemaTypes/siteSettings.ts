import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site instellingen",
  type: "document",

  fields: [
    defineField({
      name: "bookingUrl",
      title: "Boekingslink",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "tagline",
      title: "Tagline (header)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heroTitle",
      title: "Hero titel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heroLead",
      title: "Hero subtitel",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "ctaBook",
      title: "Knoptekst – Boek afspraak",
      type: "string",
      initialValue: "Boek je afspraak",
    }),

    defineField({
      name: "ctaOffer",
      title: "Knoptekst – Bekijk aanbod",
      type: "string",
      initialValue: "Bekijk aanbod",
    }),

    defineField({
      name: "stats",
      title: "Hero stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titel", type: "string" }),
            defineField({ name: "text", title: "Tekst", type: "string" }),
          ],
        },
      ],
    }),

    /* ======================
       HOME
    ====================== */
    defineField({
      name: "offerIntro",
      title: "Aanbod intro (home)",
      type: "string",
    }),

    defineField({
      name: "coachingIntro",
      title: "Coaching intro (home)",
      type: "string",
    }),

    defineField({
      name: "coachingCards",
      title: "Coaching pakketten (home)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Naam", type: "string" }),
            defineField({
              name: "featured",
              title: "Uitgelicht",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "priceLabel",
              title: "Prijs label",
              type: "string",
            }),
            defineField({
              name: "bullets",
              title: "Bullets",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
        },
      ],
    }),

    /* ======================
       AANBOD PAGINA
    ====================== */
    defineField({
      name: "aanbodIntro",
      title: "Aanbod pagina – intro (Uitleg per dienst)",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "coachingAanbodDesc",
      title: "Aanbod pagina – coaching beschrijving",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "overLukasText",
      title: "Aanbod pagina – Over Lukas tekst",
      type: "text",
      rows: 4,
    }),

    /* ======================
       CONTACT
    ====================== */
    defineField({
      name: "contactEmail",
      title: "Contact e-mail",
      type: "string",
    }),

    defineField({
      name: "contactPhone",
      title: "Contact telefoon",
      type: "string",
    }),

    defineField({
      name: "contactLocation",
      title: "Contact locatie",
      type: "string",
    }),

    defineField({
      name: "aboutShort",
      title: "Over Lukas (kort – home)",
      type: "text",
      rows: 3,
    }),
    
  ],
});
