"use client";

import { useSession } from "next-auth/react";
import type { AriaRole, ComponentType } from "react";
import React, { Fragment, useEffect } from "react";

import { WEBAPP_URL } from "@calcom/lib/constants";
import { useLocale } from "@calcom/lib/hooks/useLocale";

type LicenseRequiredProps = {
  as?: keyof JSX.IntrinsicElements | "";
  className?: string;
  role?: AriaRole | undefined;
  children: React.ReactNode;
};

const LicenseRequired = ({ children, as = "", ...rest }: LicenseRequiredProps) => {
  const session = useSession();
  const { t } = useLocale();
  const Component = as || Fragment;
  const hasValidLicense = session.data ? session.data.hasValidLicense : null;

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && hasValidLicense === false) {
      // Very few people will see this, so we don't need to translate it
      console.info(
        `You're using a feature that requires a valid license. Please go to ${WEBAPP_URL}/auth/setup to enter a license key.`
      );
    }
  }, []);

  return <Component {...rest}>{children}</Component>;
};

export const withLicenseRequired =
  <T extends JSX.IntrinsicAttributes>(Component: ComponentType<T>) =>
  // eslint-disable-next-line react/display-name
  (hocProps: T) =>
    (
      <div>
        <LicenseRequired>
          <Component {...hocProps} />
        </LicenseRequired>
      </div>
    );

export default LicenseRequired;
