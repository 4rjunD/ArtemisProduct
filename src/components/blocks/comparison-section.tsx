"use client";

import { Check, X } from "lucide-react";

export function ComparisonSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            Why Artemis
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight mt-3 mb-4">
            Not a Game. Not a Tutor. Something New.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Other solutions either entertain or teach. Artemis does neither. We rebuild how your child thinks.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 pr-4 font-medium text-muted-foreground"></th>
                <th className="py-4 px-4 text-center">
                  <span className="text-muted-foreground text-sm">Educational Games</span>
                </th>
                <th className="py-4 px-4 text-center">
                  <span className="text-muted-foreground text-sm">Tutoring Apps</span>
                </th>
                <th className="py-4 px-4 text-center bg-primary/5 rounded-t-lg">
                  <span className="font-serif text-lg text-primary">Artemis</span>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b">
                <td className="py-4 pr-4 text-foreground">Builds independent thinking</td>
                <td className="py-4 px-4 text-center">
                  <X className="w-5 h-5 text-muted-foreground mx-auto" />
                </td>
                <td className="py-4 px-4 text-center">
                  <X className="w-5 h-5 text-muted-foreground mx-auto" />
                </td>
                <td className="py-4 px-4 text-center bg-primary/5">
                  <Check className="w-5 h-5 text-accent mx-auto" />
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-4 pr-4 text-foreground">Never gives answers</td>
                <td className="py-4 px-4 text-center">
                  <X className="w-5 h-5 text-muted-foreground mx-auto" />
                </td>
                <td className="py-4 px-4 text-center">
                  <X className="w-5 h-5 text-muted-foreground mx-auto" />
                </td>
                <td className="py-4 px-4 text-center bg-primary/5">
                  <Check className="w-5 h-5 text-accent mx-auto" />
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-4 pr-4 text-foreground">Tracks reasoning improvement</td>
                <td className="py-4 px-4 text-center">
                  <X className="w-5 h-5 text-muted-foreground mx-auto" />
                </td>
                <td className="py-4 px-4 text-center">
                  <X className="w-5 h-5 text-muted-foreground mx-auto" />
                </td>
                <td className="py-4 px-4 text-center bg-primary/5">
                  <Check className="w-5 h-5 text-accent mx-auto" />
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-4 pr-4 text-foreground">Designed to be outgrown</td>
                <td className="py-4 px-4 text-center">
                  <X className="w-5 h-5 text-muted-foreground mx-auto" />
                </td>
                <td className="py-4 px-4 text-center">
                  <X className="w-5 h-5 text-muted-foreground mx-auto" />
                </td>
                <td className="py-4 px-4 text-center bg-primary/5">
                  <Check className="w-5 h-5 text-accent mx-auto" />
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-4 pr-4 text-foreground">Works for ages 6-18</td>
                <td className="py-4 px-4 text-center">
                  <span className="text-muted-foreground">Limited</span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="text-muted-foreground">Varies</span>
                </td>
                <td className="py-4 px-4 text-center bg-primary/5">
                  <Check className="w-5 h-5 text-accent mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="py-4 pr-4 text-foreground">Affordable monthly price</td>
                <td className="py-4 px-4 text-center">
                  <Check className="w-5 h-5 text-muted-foreground mx-auto" />
                </td>
                <td className="py-4 px-4 text-center">
                  <X className="w-5 h-5 text-muted-foreground mx-auto" />
                </td>
                <td className="py-4 px-4 text-center bg-primary/5 rounded-b-lg">
                  <Check className="w-5 h-5 text-accent mx-auto" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
