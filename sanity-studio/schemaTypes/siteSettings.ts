import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site instellingen",
  type: "document",

  fields: [
    /* ======================
       HEADER (NIEUW)
    ====================== */
    defineField({
      name: "brandName",
      title: "Brand naam (header)",
      type: "string",
      initialValue: "Lukas Denolf",
    }),

    defineField({
      name: "headerBookingText",
      title: "Header knoptekst – Booking",
      type: "string",
      initialValue: "Boek afspraak",
    }),

    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      initialValue: "https://www.instagram.com/kadanscoaching/",
    }),

    defineField({
      name: "instagramText",
      title: "Instagram knoptekst",
      type: "string",
      initialValue: "Volg ons",
    }),

    defineField({
      name: "brandTaglineAanbod",
      title: "Tagline (aanbod pagina header)",
      type: "string",
      initialValue: "Aanbod — details",
    }),

    defineField({
      name: "headerBackText",
      title: "Aanbod pagina – terug knoptekst",
      type: "string",
      initialValue: "← Terug",
    }),

    defineField({
      name: "navHomeOffer",
      title: "Navigatie – Home: Aanbod",
      type: "string",
      initialValue: "Aanbod",
    }),
    defineField({
      name: "navHomeCoaching",
      title: "Navigatie – Home: Coaching",
      type: "string",
      initialValue: "Coaching",
    }),
    defineField({
      name: "navHomeAppointment",
      title: "Navigatie – Home: Afspraak",
      type: "string",
      initialValue: "Afspraak",
    }),
    defineField({
      name: "navHomeContact",
      title: "Navigatie – Home: Contact",
      type: "string",
      initialValue: "Contact",
    }),

    defineField({
      name: "navAanbodFiets",
      title: "Navigatie – Aanbod: Fiets",
      type: "string",
      initialValue: "Fiets",
    }),
    defineField({
      name: "navAanbodLopen",
      title: "Navigatie – Aanbod: Lopen",
      type: "string",
      initialValue: "Lopen",
    }),
    defineField({
      name: "navAanbodMetabool",
      title: "Navigatie – Aanbod: Metabool",
      type: "string",
      initialValue: "Metabool",
    }),
    defineField({
      name: "navAanbodCoaching",
      title: "Navigatie – Aanbod: Coaching",
      type: "string",
      initialValue: "Coaching",
    }),

    /* ======================
       BESTAAND
    ====================== */
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
      name: "coachingCardIntro",
      title: "Coaching kaart – korte tekst (aanbod)",
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
