{
  description = "Java 25, Maven 3.9 and Liquibase (Community) Environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, utils }:
    utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfree = true;
        };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            jdk25
            maven
            liquibase 
            postgresql_jdbc
          ];

          shellHook = ''
            export JAVA_HOME=${pkgs.jdk25.home}
            
            echo "------------------------------------------"
            echo "🚀 Java 25, Maven 3.9 & Liquibase Shell Active"
            echo "JDK Path: $JAVA_HOME"
            java -version
            mvn -version
            echo "Liquibase Version:"
            liquibase --version
            echo "------------------------------------------"
          '';
        };

        checks = {
          build = pkgs.stdenv.mkDerivation {
            name = "java-project-test";
            src = ./.;
            buildInputs = [ pkgs.jdk25 pkgs.maven ];
            buildPhase = "mvn test";
            installPhase = "touch $out";
          };
        };
      });
}